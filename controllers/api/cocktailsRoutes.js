const router = require('express').Router();
const axios = require('axios');

const getCocktails = async (searchTerm) => {
  try {
    const response = await axios.get(`http://www.thecocktaildb.com/api/json/v1/1/search.php?s=${searchTerm}`);
    if (response.data.drinks) {
      const cocktails = response.data.drinks.map((drink) => {
        const ingredients = [];
        for (let i = 1; i <= 15; i++) {
          const ingredient = drink[`strIngredient${i}`];
          const measure = drink[`strMeasure${i}`];
          if (ingredient) {
            ingredients.push({ ingredient, measure });
          }
        }
        return {
          name: drink.strDrink,
          category: drink.strCategory,
          instructions: drink.strInstructions,
          thumbnail: drink.strDrinkThumb,
          ingredients,
        };
      });
      return cocktails;
    } else {
      console.log('No drinks found');
      return [];
    }
  } catch (error) {
    console.error(`Error: ${error}`);
    return [];
  }
};

router.get('/:searchTerm', async (req, res) => {
  const cocktails = await getCocktails(req.params.searchTerm);
  res.render('mycocktails', { title: 'My Cocktails', cocktails });
});

module.exports = router;
