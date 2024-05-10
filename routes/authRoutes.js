const express = require('express');
const router = express.Router();
const {registerUser,loginUser,loginOrRegisterExternal} = require('../controllers/authController');

router.post('/register', registerUser);
router.post('/login', loginUser);
router.post('/external',loginOrRegisterExternal);
// router.post('/signout',signOutUser);

module.exports = router;
