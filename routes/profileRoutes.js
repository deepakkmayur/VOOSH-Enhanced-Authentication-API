const express = require('express');
const router = express.Router();
const profileController = require('../controllers/profileController');
const {getMyProfile,updateProfile,toggleProfilePrivacy,getPublicProfiles,getAllProfiles}=require("../controllers/profileController")
const {tokenVerify,authorize} = require('../middleware/authMiddleware');



// router.get('/myprofile',tokenVerify,getMyProfile);
router.get('/myprofile',tokenVerify,authorize,getMyProfile);
router.put('/update',tokenVerify,authorize, updateProfile);
router.put('/toggleprivacy',tokenVerify,authorize, toggleProfilePrivacy);
router.get('/public',tokenVerify,authorize,getPublicProfiles);
router.get('/all',tokenVerify,authorize, getAllProfiles);

module.exports = router;
