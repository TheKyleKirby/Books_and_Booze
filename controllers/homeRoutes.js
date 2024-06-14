const express = require('express');
const router = require('express').Router();
const axios = require('axios');

router.get('/mybooks', async (req, res) => {
    console.log('Received request for books');
    try {
        // const response = await axios.get(`https://www.googleapis.com/books/v1/volumes?q=${searchTerm}`);
        // const books = response.data.items.map(book => ({
        //   title: book.volumeInfo.title,
        //   authors: book.volumeInfo.authors,
        //   publisher: book.volumeInfo.publisher,
        // })).slice(0, 10);
        const books= [
            {
              title: 'The Great Gatsby',
              authors: ['F. Scott Fitzgerald'],
              publisher: 'Scribner'
            },
            {
              title: 'To Kill a Mockingbird',
              authors: ['Harper Lee'],
              publisher: 'J.B. Lippincott & Co.'
            },
            {
              title: '1984',
              authors: ['George Orwell'],
              publisher: 'Secker & Warburg'
            },
            {
              title: 'Harry Potter and the Sorcerer\'s Stone',
              authors: ['J.K. Rowling'],
              publisher: 'Bloomsbury'
            },
            {
              title: 'The Catcher in the Rye',
              authors: ['J.D. Salinger'],
              publisher: 'Little, Brown and Company'
            },
            {
              title: 'The Hobbit',
              authors: ['J.R.R. Tolkien'],
              publisher: 'Allen & Unwin'
            },
            {
              title: 'Lord of the Flies',
              authors: ['William Golding'],
              publisher: 'Faber and Faber'
            },
            {
              title: 'Animal Farm',
              authors: ['George Orwell'],
              publisher: 'Secker & Warburg'
            },
            {
              title: 'Brave New World',
              authors: ['Aldous Huxley'],
              publisher: 'Chatto & Windus'
            },]
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