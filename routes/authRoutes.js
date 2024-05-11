const express = require('express');
const router = express.Router();
const {registerUser,registerAdmin,loginUser,loginAdmin} = require('../controllers/authController');
const {validate} =require("express-validation")
const validation = require("../validation/authValidation");

// /**
//  * @swagger
//  * /user/register
//  * const:
//  * summary:create user
//  * description:register a new user.
//  * response:
//  * 200:
//  * description:user created succesfully
//  */
router.post('/user/register',validate(validation.registerUser), registerUser);
router.post('/admin/register',validate(validation.registerAdmin), registerAdmin);
router.post('/user/login',validate(validation.loginUser), loginUser);
router.post('/admin/login',validate(validation.loginAdmin) ,loginAdmin);

module.exports = router;
