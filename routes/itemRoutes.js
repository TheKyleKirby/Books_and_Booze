const express = require('express');
const router = express.Router();
const itemController = require('../controllers/itemController');
const authMiddleware = require('../middlewares/authMiddleware');

// Get all items (protected route)
router.get('/', authMiddleware, itemController.getAllItems);

// Add a new item (protected route)
router.post('/', authMiddleware, itemController.addItem);

module.exports = router;
