const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const userModel = require('../models/User');
const { JWT_SECRET_KEY } = require("../env")
const Profile = require('../models/Profile');
const env=require("../env")

//token generation
const generateToken=async(id)=>{
    return jwt.sign({id}, JWT_SECRET_KEY, { expiresIn: '1h' });
 }

// Register a new user
const registerUser = async (req, res) => {
    try {
        console.log(req.body);
        const userExists=await userModel.find({email:req.body.email})
     if(userExists.length>0){
        // console.log(userExists);
        res.status(400).json({message:"user already exists",userExists})
     }else{
        if(req.body.email && req.body.password && req.body.name ){
            const salt = await bcrypt.genSalt(10);
            const hashPassword = await bcrypt.hash(req.body.password, salt);
            req.body.password = hashPassword;
           const saveUser=await userModel.create({name:req.body.name,email:req.body.email,password:req.body.password})
        //   const token = await jwt.sign({ id:saveUser._id}, JWT_SECRET_KEY, { expiresIn: '1h' });
           res.status(201).json({message:"user created succesfully",saveUser,token:await generateToken(saveUser._id)})
        }else{
           res.status(400).json({message:"Enter the credentials properly"})
        }
     }
     } catch (error) { 

        console.log(error);
        res.status(400).json({message:"catch error",error})
     }
};

// Admin register
const registerAdmin = async (req, res) => {
    //check whether email is used or not
    const userExists=await userModel.findOne({email:req.body.email})
    if(userExists){
        return res.status(400).json({message:"email is already used"})
    }

    //   Check if adminSecretCode code is valid
    if (req.body.adminSecretCode !== env.ADMIN_REGISTRATION_CODE) {
        return res.status(403).json({ message: 'Invalid adminSecretCode' });
    }

    try {
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(req.body.password, salt);
        // Create new admin user
        const adminUser = new userModel({
            name:"admin",
            email:req.body.email,
            password: hashedPassword,
            role: 'admin'
        });

        // Save admin user to database
        await adminUser.save();

        res.status(201).json({ message: 'Admin registration successfully' });
    } catch (error) {
        console.error('Admin registration error:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

// Login user
const loginUser = async (req, res) => {
    try {
        if(!req.body.password || !req.body.email){
           return res.status(400).json({message:"eneter the credentials properly"})
          }
        const userExists=await userModel.findOne({email:req.body.email})
        if(!userExists){
           return res.status(400).json({message:"User dosent exist. please register"})
        }
        const matchPassword=await bcrypt.compare(req.body.password,userExists.password)
        // console.log(matchPassword);
        if(!matchPassword){
          return res.status(400).json({message:"Password incorrect"})
        }
        const user={
           _id:userExists._id,
           name:userExists.name,
        //    email:userExists.email,
           role: userExists.role,
           token: await generateToken(userExists._id)
        }
        // console.log(user);
        res.status(200).json({message:"loggin success",user})
        
      } catch (error) {
        console.log(error);
        res.status(400).json({message:"catch error in login"})
      }
};

//admin Login
const loginAdmin = async (req, res) => {
    const { email, password } = req.body;

    try {
        if (req.body.adminSecretCode !== env.ADMIN_REGISTRATION_CODE) {
            return res.status(403).json({ message: 'Invalid adminSecretCode' });
        }

        const adminUser = await userModel.findOne({ email, role: 'admin'});
        if (!adminUser) {
            return res.status(401).json({ message: 'Invalid credentials'});
        }

        const isPasswordValid = await bcrypt.compare(password, adminUser.password);
        if (!isPasswordValid) {
            return res.status(401).json({ message: 'Invalid Passowrd'});
        }
       
         const admin={
            _id:adminUser._id,
            name:adminUser.name,
            role: adminUser.role,
            token:await generateToken(adminUser._id)
         }
         res.status(200).json({message:"admin login success",admin})
    } catch (error) {
        console.error('Admin login error:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};


// Login or register with external service (e.g., Google, Facebook)
const loginOrRegisterExternal = async (req, res) => {
    // Implement login/register with external service logic
};



module.exports={
    registerUser,
    registerAdmin,
    loginUser,
    loginAdmin,
    loginOrRegisterExternal,
}