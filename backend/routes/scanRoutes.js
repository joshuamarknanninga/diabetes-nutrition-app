// routes/scanRoutes.js
const express = require('express');
const router = express.Router();
const { createScan, getScans } = require('../controllers/scanController');
const { protect } = require('../middleware/authMiddleware');

// Create a new scan
router.post('/', protect, createScan);

// Get all scans for a user
router.get('/', protect, getScans);

module.exports = router;
