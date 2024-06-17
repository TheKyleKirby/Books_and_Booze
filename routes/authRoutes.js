const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const authMiddleware = require('../middlewares/authMiddleware');

// User registration
router.post('/signup', authController.signup);

// User login
router.post('/login', authController.login);

// User logout
router.post('/logout', authMiddleware, authController.logout);

module.exports = router;
