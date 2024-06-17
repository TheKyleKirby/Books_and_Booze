const express = require('express');
const router = require('express').Router();
const axios = require('axios');
const { getCocktails } = require('./api/cocktails');
// Default Root
router.get('/', (req, res) => {
  res.send('Welcome to Books and Booze!');
});

//Route to fetch Books
router.get('/mybooks', async (req, res) => {
    console.log('Received request for books');
    try {
        const term = req.query.searchterm;
        const response = await axios.get(`http://localhost:3001/books/${term}`);
        console.log(response.data)
        const books = response.data.map(book => ({
          title: book.title,
          authors: book.authors,
          publisher: book.publisher,
        })).slice(0, 10);
        res.render('mybooks', { 
            books,
            logged_in: req.session.logged_in
          });
        } catch (err) {
            console.error(`Error: ${err}`);
          res.status(500).json(err);
        }
      });
//Route to fetch Cocktails
router.get('/cocktails/:searchTerm', async (req, res) => {
  const searchTerm = req.params.searchTerm;
  const cocktails = await getCocktails(searchTerm);
  if (cocktails) {
      res.render('mycocktails', { cocktails });
  } else {
      res.status(500).json({ error: 'Failed to fetch cocktails' });
  }
});

module.exports = router;