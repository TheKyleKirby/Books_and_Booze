//Cocktails DB API
const axios = require('axios');

const getCocktails = async (searchTerm) => {
  try {
    console.log(`Fetching cocktails for search term: ${searchTerm}`);
    const response = await axios.get(`http://www.thecocktaildb.com/api/json/v1/1/search.php?s=${searchTerm}`);
    if (response.data.drinks) {
      const cocktails = response.data.drinks.map(drink => ({
        name: drink.strDrink,
        category: drink.strCategory,
        instructions: drink.strInstructions,
        thumbnail: drink.strDrinkThumb,
      }));
      return cocktails;
    } else {
      console.log('No drinks found');
      return []; // No drinks found
    }
  } catch (error) {
    console.error(`Error: ${error}`);
    return null; // Error occurred
  }
};

module.exports = { getCocktails };


