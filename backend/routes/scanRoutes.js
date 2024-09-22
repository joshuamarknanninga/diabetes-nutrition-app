// routes/scanRoutes.js
const express = require('express');
const router = express.Router();
const { createScan, getScans, getScanById, deleteScan } = require('../controllers/scanController');
const { protect } = require('../middleware/authMiddleware');

// @route   POST /api/scans
router.post('/', protect, createScan);

// @route   GET /api/scans
router.get('/', protect, getScans);

// @route   GET /api/scans/:id
router.get('/:id', protect, getScanById);

// @route   DELETE /api/scans/:id
router.delete('/:id', protect, deleteScan);

module.exports = router;
