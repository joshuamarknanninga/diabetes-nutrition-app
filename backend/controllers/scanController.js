// controllers/scanController.js
const Scan = require('../models/Scan');
const fetchNutritionData = require('../utils/fetchNutritionData');

// @desc    Create a new scan
// @route   POST /api/scans
// @access  Private
exports.createScan = async (req, res) => {
  const { upc } = req.body;
  const userId = req.user.id;

  try {
    // Fetch nutrition data from external API
    const nutritionData = await fetchNutritionData(upc);
    if (!nutritionData) {
      return res.status(404).json({ message: 'Product not found' });
    }

    // Create new scan
    const newScan = new Scan({
      user: userId,
      upc,
      productName: nutritionData.productName,
      brand: nutritionData.brand,
      servingSize: nutritionData.servingSize,
      totalCarbs: nutritionData.totalCarbs,
      nutrients: nutritionData.nutrients
    });

    const savedScan = await newScan.save();
    res.status(201).json(savedScan);
  } catch (error) {
    console.error('Error in createScan:', error.message);
    res.status(500).send('Server Error');
  }
};

// @desc    Get all scans for a user
// @route   GET /api/scans
// @access  Private
exports.getScans = async (req, res) => {
  const userId = req.user.id;

  try {
    const scans = await Scan.find({ user: userId }).sort({ scannedAt: -1 });
    res.json(scans);
  } catch (error) {
    console.error('Error in getScans:', error.message);
    res.status(500).send('Server Error');
  }
};
