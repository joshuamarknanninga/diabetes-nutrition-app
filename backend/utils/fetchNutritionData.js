// utils/fetchNutritionData.js
const axios = require('axios');
require('dotenv').config();

const fetchNutritionData = async (upc) => {
  try {
    const apiKey = process.env.USDA_API_KEY;
    const response = await axios.get(
      `https://api.nal.usda.gov/fdc/v1/foods/search`,
      {
        params: {
          query: upc,
          api_key: apiKey,
          pageSize: 1
        }
      }
    );

    if (
      response.data &&
      response.data.foods &&
      response.data.foods.length > 0
    ) {
      const food = response.data.foods[0];
      const nutrients = {};

      food.foodNutrients.forEach((nutrient) => {
        nutrients[nutrient.nutrientName] = nutrient.value;
      });

      return {
        productName: food.description,
        brand: food.brandOwner || 'Unknown',
        servingSize: `${food.servingSize} ${food.servingSizeUnit}`,
        totalCarbs: nutrients['Carbohydrate, by difference'] || 0,
        nutrients
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
