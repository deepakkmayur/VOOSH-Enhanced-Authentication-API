const Profile = require('../models/Profile');

// Get current user's profile
const getMyProfile = async (req, res) => {
   console.log("reached");
};

// Update user's profile
const updateProfile = async (req, res) => {
   
};

// Toggle profile privacy (public/private)
const toggleProfilePrivacy = async (req, res) => {
    
};

// Get list of public profiles (accessible to normal users)
const getPublicProfiles = async (req, res) => {
    
};

// Get list of all profiles (accessible to admin users)
const getAllProfiles = async (req, res) => {
   
};


module.exports={
    getMyProfile,
    updateProfile,
    toggleProfilePrivacy,
    getPublicProfiles,
    getAllProfiles,

}