const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const userModel = require('../models/User');
const Profile = require('../models/Profile');

//token generation
const generateToken=async(id)=>{
    return jwt.sign({id}, JWT_SECRET_KEY, { expiresIn: '1h' });
 }

// Register a new user
const registerUser = async (req, res) => {
    try {
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
           email:userExists.email,
           token: await generateToken(userExists._id)
        }
        // console.log(user);
        res.status(200).json({message:"loggin success",user})
        
      } catch (error) {
        console.log(error);
        res.status(400).json({message:"catch error in login"})
      }
};

// Login or register with external service (e.g., Google, Facebook)
const loginOrRegisterExternal = async (req, res) => {
    // Implement login/register with external service logic
};

// // Sign out user
// const signOutUser = async (req, res) => {
   
// };

module.exports={
    registerUser,
    loginUser,
    loginOrRegisterExternal,
    // signOutUser
}