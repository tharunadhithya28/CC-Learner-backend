const express = require('express');
const { registerUser, loginUser, getUserProfile, logoutUser } = require('../controller/userController');
const protect = require('../middleware/authMiddleware');
const router = express.Router();

router.post('/register', registerUser);
router.post('/login', loginUser);
router.get('/profile',protect, getUserProfile);
router.get('/logout', logoutUser)

module.exports = router;
