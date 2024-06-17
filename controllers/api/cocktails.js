//Cocktails DB API
const axios = require('axios');
const express = require('express');
const app = express();
const port = 3001;

const getCocktails = async (searchTerm) => {
  try {
    console.log(`Fetching cocktails for search term: ${searchTerm}`);
    const response = await axios.get(`http://www.thecocktaildb.com/api/json/v1/1/search.php?s=${searchTerm}`);
    if (response.data.drinks) {
      const cocktails = response.data.drinks.map(drink => {
        const ingredients = [];
        for (let i = 1; i <= 15; i++) {
            const ingredient = drink[`strIngredient${i}`];
            const measure = drink[`strMeasure${i}`];
            if (ingredient) {
                ingredients.push({ingredient, measure});
            }
        }
        return {
        name: drink.strDrink,
        category: drink.strCategory,
        instructions: drink.strInstructions,
        thumbnail: drink.strDrinkThumb,
        ingredients: ingredients
        };
      });
      return cocktails;
    } else {
      console.log('No drinks found');
      return []; 
    }
  } catch (error) {
    console.error(`Error: ${error}`);
    return null; 
  }
};

module.exports = { getCocktails };


