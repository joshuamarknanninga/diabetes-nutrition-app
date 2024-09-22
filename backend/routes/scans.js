const express = require('express');
const router = express.Router();
const Scan = require('../models/Scan');
const axios = require('axios');

// Endpoint to create a new scan
router.post('/', async (req, res) => {
  const { upc } = req.body;
  try {
    // Fetch nutrition data from external API
    const nutritionData = await fetchNutritionData(upc);
    if (!nutritionData) {
      return res.status(404).json({ message: 'Product not found' });
    }

    // Create new scan document
    const newScan = new Scan({
      upc,
      productName: nutritionData.productName,
      brand: nutritionData.brand,
      servingSize: nutritionData.servingSize,
      totalCarbs: nutritionData.totalCarbs,
      nutrients: nutritionData.nutrients,
    });

    const savedScan = await newScan.save();
    res.json(savedScan);
  } catch (err) {
    console.error(err);
    res.status(500).send('Server Error');
  }
});

// Endpoint to get all scans
router.get('/', async (req, res) => {
  try {
    const scans = await Scan.find().sort({ scannedAt: -1 });
    res.json(scans);
  } catch (err) {
    console.error(err);
    res.status(500).send('Server Error');
  }
});

// Function to fetch nutrition data from external API
async function fetchNutritionData(upc) {
  try {
    // Example using USDA FoodData Central API
    const apiKey = process.env.USDA_API_KEY;
    const response = await axios.get(`https://api.nal.usda.gov/fdc/v1/foods/search`, {
      params: {
        query: upc,
        api_key: apiKey,
      },
    });

    if (response.data.foods && response.data.foods.length > 0) {
      const food = response.data.foods[0];
      const nutrients = {};
      food.foodNutrients.forEach(nutrient => {
        nutrients[nutrient.nutrientName] = nutrient.value;
      });

      return {
        productName: food.description,
        brand: food.brandOwner || 'Unknown',
        servingSize: `${food.servingSize} ${food.servingSizeUnit}`,
        totalCarbs: nutrients['Carbohydrate, by difference'] || 0,
        nutrients,
      };
    } else {
      return null;
    }
  } catch (error) {
    console.error('Error fetching nutrition data:', error);
    return null;
  }
}

module.exports = router;
