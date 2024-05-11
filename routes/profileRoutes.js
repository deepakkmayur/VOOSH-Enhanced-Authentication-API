const express = require('express');
const router = express.Router();
const {createMyProfile,getMyProfile,updateProfile,userProfilePrivacy,getPublicProfiles,getAllProfiles,uploadProfilePhoto,uploadMiddleware}=require("../controllers/profileController")
const {tokenVerify,authorize} = require('../middleware/authMiddleware');
const {validate} =require("express-validation")
const validation = require("../validation/profileValidation");



// router.get('/myprofile',tokenVerify,getMyProfile);
router.post('/myprofile',validate(validation.createMyProfile),tokenVerify,authorize,createMyProfile);
// router.post('/myprofile',tokenVerify,authorize,createMyProfile);
router.get('/myprofile',tokenVerify,authorize,getMyProfile);
router.put('/myprofile',validate(validation.updateProfile),tokenVerify,authorize, updateProfile);
router.put('/profileprivacy',validate(validation.userProfilePrivacy),tokenVerify,authorize, userProfilePrivacy);
router.get('/publicprofile',tokenVerify,authorize,getPublicProfiles); 
router.get('/allprofile',tokenVerify,authorize, getAllProfiles);
router.post('/upload',tokenVerify,authorize,uploadMiddleware,uploadProfilePhoto);


module.exports = router;
