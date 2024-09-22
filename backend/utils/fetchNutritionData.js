// utils/fetchNutritionData.js
const axios = require('axios');
require('dotenv').config();

const fetchNutritionData = async (upc) => {
  try {
    const apiKey = process.env.USDA_API_KEY;

    // First, search for the UPC code
    const searchResponse = await axios.get('https://api.nal.usda.gov/fdc/v1/foods/search', {
      params: {
        api_key: apiKey,
        query: upc,
        dataType: ['Branded'],
        pageSize: 1,
      },
    });

    if (
      searchResponse.data.foods &&
      searchResponse.data.foods.length > 0
    ) {
      const food = searchResponse.data.foods[0];

      // Extract nutrients
      const nutrients = {};
      food.foodNutrients.forEach((nutrient) => {
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
    console.error('Error fetching nutrition data:', error.message);
    return null;
  }
};

module.exports = fetchNutritionData;
