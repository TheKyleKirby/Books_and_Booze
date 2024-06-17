const express = require('express');
const router = express.Router();
const { getBooks } = require('../controllers/api/book');

router.get('/:searchTerm', async (req, res) => {
  const books = await getBooks(req.params.searchTerm);
  res.render('mybooks', { title: 'My Books', books });
});

module.exports = router;
