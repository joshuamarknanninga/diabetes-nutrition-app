// backend/utils/fetchNutritionData.js

const axios = require('axios');

const fetchNutritionData = async (upc) => {
  try {
    const apiKey = process.env.USDA_API_KEY;
    // First, search by UPC
    const searchResponse = await axios.get(`https://api.nal.usda.gov/fdc/v1/foods/search`, {
      params: {
        query: upc,
        dataType: ['Branded'], // to get branded foods
        api_key: apiKey,
      },
    });

    if (searchResponse.data.foods && searchResponse.data.foods.length > 0) {
      const food = searchResponse.data.foods[0];
      // Extract necessary nutrients
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
      // If no branded food found, try general search or return null
      return null;
    }
  } catch (error) {
    console.error('Error fetching nutrition data:', error.message);
    return null;
  }
};

module.exports = fetchNutritionData;
