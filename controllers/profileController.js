const Profile = require('../models/Profile');
const User = require('../models/User');
const bcrypt = require('bcrypt');
const multer = require('multer');

// create a Profile
const createMyProfile = async (req, res) => {
    try {
        const existingProfile = await Profile.findOne({ user: req.user._id });
        if (existingProfile) {
            return res.status(400).json({ message: 'Profile already exists for this user' });
        }

        const newProfile = new Profile({
            user: req.user._id,
            bio: req?.body?.bio,
            phone: req?.body?.phone,
            photoUrl: req?.body?.photoUrl,
            isPublic: req?.body?.isPublic
        })
        const createdProfile = await newProfile.save()
        if (!createdProfile) {
            res.status(400).json({ message: "error while creating the profile" })
        }

        res.status(200).json({ message: "profile created successfully", createdProfile })
    } catch (error) {
        console.error('Error while creating user profile:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
}

// Get current user's profile
const getMyProfile = async (req, res) => {
    try {
        const userId = req.user._id;

        // const profile = await Profile.findOne({ user: userId }).populate('user', 'name email');
        const profile = await Profile.findOne({ user: userId })
        if (!profile) {
            return res.status(404).json({ message: 'Profile not found' });
        }
        if (profile) {
            const user = await User.findOne({ email: req?.user?.email })
            res.status(200).json({ profile, user });
        }

    } catch (error) {
        console.error('Error fetching user profile:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};


// Update user profile
const updateProfile = async (req, res) => {
    try {
        const userId = req.user._id;
        // Find the user's profile based on the user ID
        let profile = await Profile.findOne({ user: userId });
        if (!profile) {
            return res.status(404).json({ message: 'Profile not found' });
        }
        // Update profile fields based on request body
        const { name, email, password, bio, phone, photoUrl } = req.body;

        // Update user's name and email (if provided)
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        user.name = name || user.name;
        if (email && email !== user.email) {
            const existingUser = await User.findOne({ email });
            if (existingUser && existingUser._id.toString() !== userId) {
                return res.status(400).json({ message: 'Email already in use' });
            }
            user.email = email;
        }

        // Update user's password (if provided)
        if (password) {
            const salt = await bcrypt.genSalt(10);
            const hashedPassword = await bcrypt.hash(req.body.password, salt);
            user.password = hashedPassword;
        }

        await user.save();

        // Update profile fields
        profile.bio = bio || profile.bio;
        profile.phone = phone || profile.phone;
        profile.photoUrl = photoUrl || profile.photoUrl;

        await profile.save();

        res.json({ message: 'Profile updated successfully' });
    } catch (error) {
        console.error('Error updating user profile:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};


// to make user profile public/private
const userProfilePrivacy = async (req, res) => {
    const userId = req.user.id;
    const isPublic = req?.body?.isPublic;

    try {
        const profile = await Profile.findOneAndUpdate(
            { user: userId },
            { isPublic },
            { new: true }
        );

        if (!profile) {
            return res.status(404).json({ message: 'Profile not found' });
        }

        res.status(200).json({ message: 'Profile visibility updated successfully', profile });
    } catch (error) {
        console.error('Error updating profile privacy:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

// Get all public profiles (accessible to normal users)
const getPublicProfiles = async (req, res) => {
    try {
        const role = req.user.role
        if (role === "user") {
            const allUserProfile = await Profile.find({ isPublic: true })
            return res.status(200).json(allUserProfile)
        }

        return res.status(400).json({ message: "this route is for users only" })

    } catch (error) {
        console.error('Error in listing all public profile :', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

// Get list of all profiles (accessible to admin users)
const getAllProfiles = async (req, res) => {
    try {
        if (req.user.role === "admin") {
         const allProfile=await Profile.find()
         if(allProfile){
           return res.status(200).json(allProfile)
         }
         return res.status(400).json({ message: "profile dose not exist" })
        }
        return res.status(400).json({ message: "Only admin users can access this route" })

    } catch (error) {
        console.error('Error in listing getAllProfiles :', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};


// Multer configuration for profile photo uploads

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/profiles'); 
    },
    filename: (req, file, cb) => {
        const fileExtension = file.originalname.split('.').pop();
        cb(null, 'profile-'+ '.' + fileExtension); 
    }
});

const upload = multer({ storage });

const uploadProfilePhoto = async(req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ message: 'No file uploaded' });
        }

        const filePath = req.file.path;
        const userId = req.user._id;
        let profile = await Profile.findOne({user:userId});
        if (!profile) {
            return res.status(404).json({ message: 'Profile not found' });
        }   
        profile.photoUrl = filePath;
        await profile.save();

        res.json({ message: 'Profile photo uploaded successfully', filePath });
    } catch (error) {
        console.error('Error in profile photo upload:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};


module.exports = {
    createMyProfile,
    getMyProfile,
    updateProfile,
    userProfilePrivacy,
    getPublicProfiles,
    getAllProfiles,
    uploadProfilePhoto,
    uploadMiddleware: upload.single('photo'),


}