const express = require('express');
const router = express.Router();
const axios = require('axios');
const { getCocktails } = require('./api/cocktails');
// Default Root
router.get('/', (req, res) => {
  res.send('Welcome to Books and Booze!');
});

// Route to render the home page or main page
router.get('/', (req, res) => {
    res.render('home', {
        logged_in: req.session.logged_in
    });
});

// Route to handle searching for books
router.get('/mybooks', async (req, res) => {
    console.log('Received request for books');
    try {
        const term = req.query.searchterm;
        const response = await axios.get(`http://localhost:3001/books/${term}`);
        console.log(response.data)
        const books = response.data.map(book => ({
          title: book.title,
          authors: book.authors.join(', '), // Ensure authors are joined as a string
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

module.exports = router;
