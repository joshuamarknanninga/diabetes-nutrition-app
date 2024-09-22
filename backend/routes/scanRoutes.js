// backend/routes/scanRoutes.js

const express = require('express');
const router = express.Router();
const {
  createScan,
  getScans,
  getScanById,
  deleteScan,
} = require('../controllers/scanController');
const authMiddleware = require('../middleware/authMiddleware');

// All routes below are protected
router.use(authMiddleware);

// @route   POST /api/scans
router.post('/', createScan);

// @route   GET /api/scans
router.get('/', getScans);

// @route   GET /api/scans/:id
router.get('/:id', getScanById);

// @route   DELETE /api/scans/:id
router.delete('/:id', deleteScan);

module.exports = router;
