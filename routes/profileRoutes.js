const express = require('express');
const router = express.Router();
const profileController = require('../controllers/profileController');
const {getMyProfile,updateProfile,toggleProfilePrivacy,getPublicProfiles,getAllProfiles}=require("../controllers/profileController")
const authMiddleware = require('../middleware/authMiddleware');



router.get('/myprofile',getMyProfile);
router.put('/update', updateProfile);
router.put('/toggleprivacy', toggleProfilePrivacy);
router.get('/public',getPublicProfiles);
router.get('/all', getAllProfiles);

module.exports = router;
