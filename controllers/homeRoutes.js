const express = require('express');
const router = express.Router();

// Home page route (redirects to login)
router.get('/main', (req, res) => {
  res.redirect('/main');
});

// Login page route
router.get('/login', (req, res) => {
  res.render('login', { title: 'Login' });
});

// Signup page route
router.get('/signup', (req, res) => {
  res.render('signup', { title: 'Signup' });
});

// My Books page route
router.get('/mybooks', (req, res) => {
  // You can add authentication middleware here if needed
  res.render('mybooks', { title: 'My Books', books: [] });
});

// My Cocktails page route
router.get('/mycocktails', (req, res) => {
  // You can add authentication middleware here if needed
  res.render('mycocktails', { title: 'My Cocktails', cocktails: [] });
});

module.exports = router;