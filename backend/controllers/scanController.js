// controllers/scanController.js
const Scan = require('../models/Scan');
const fetchNutritionData = require('../utils/fetchNutritionData');

// @desc    Create a new scan
// @route   POST /api/scans
// @access  Private
const createScan = async (req, res) => {
  const { upc } = req.body;

  if (!upc) {
    return res.status(400).json({ message: 'UPC code is required.' });
  }

  try {
    // Fetch nutrition data from external API
    const nutritionData = await fetchNutritionData(upc);

    if (!nutritionData) {
      return res.status(404).json({ message: 'Product not found.' });
    }

    // Create new scan document
    const newScan = new Scan({
      user: req.user._id,
      upc,
      productName: nutritionData.productName,
      brand: nutritionData.brand,
      servingSize: nutritionData.servingSize,
      totalCarbs: nutritionData.totalCarbs,
      nutrients: nutritionData.nutrients,
    });

    const savedScan = await newScan.save();
    res.status(201).json(savedScan);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error.' });
  }
};

// @desc    Get all scans for a user
// @route   GET /api/scans
// @access  Private
const getScans = async (req, res) => {
  try {
    const scans = await Scan.find({ user: req.user._id }).sort({ scannedAt: -1 });
    res.json(scans);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error.' });
  }
};

// @desc    Get a single scan by ID
// @route   GET /api/scans/:id
// @access  Private
const getScanById = async (req, res) => {
  try {
    const scan = await Scan.findById(req.params.id);

    if (!scan) {
      return res.status(404).json({ message: 'Scan not found.' });
    }

    // Ensure the scan belongs to the authenticated user
    if (scan.user.toString() !== req.user._id.toString()) {
      return res.status(401).json({ message: 'Not authorized.' });
    }

    res.json(scan);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error.' });
  }
};

// @desc    Delete a scan
// @route   DELETE /api/scans/:id
// @access  Private
const deleteScan = async (req, res) => {
  try {
    const scan = await Scan.findById(req.params.id);

    if (!scan) {
      return res.status(404).json({ message: 'Scan not found.' });
    }

    // Ensure the scan belongs to the authenticated user
    if (scan.user.toString() !== req.user._id.toString()) {
      return res.status(401).json({ message: 'Not authorized.' });
    }

    await scan.remove();
    res.json({ message: 'Scan removed.' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error.' });
  }
};

module.exports = { createScan, getScans, getScanById, deleteScan };
