const express = require('express');
const router = express.Router();
const cocktailController = require('../controllers/api/cocktails');

router.get('/:searchTerm', async (req, res) => {
  const cocktails = await cocktailController.getCocktails(req.params.searchTerm);
  res.render('mycocktails', { cocktails });
});

module.exports = router;
