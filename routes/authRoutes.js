const express = require('express');
const router = express.Router();
const {registerUser,registerAdmin,loginUser,loginAdmin,loginOrRegisterExternal} = require('../controllers/authController');

router.post('/user/register', registerUser);
router.post('/admin/register', registerAdmin);
router.post('/user/login', loginUser);
router.post('/admin/login', loginAdmin);
router.post('/external',loginOrRegisterExternal);

module.exports = router;
