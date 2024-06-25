const router = require('express').Router();
const withAuth = require('../middlewares/authMiddleware');

router.get('/', (req, res) => {
  res.redirect('/login');
});

router.get('/login', (req, res) => {
  if (req.session.userId) {
    res.redirect('/home');
    return;
  }
  res.render('login');
});

router.get('/signup', (req, res) => {
  res.render('signup');
});

router.get('/home', withAuth, (req, res) => {
  res.render('home', { title: 'Home' });
});

router.get('/mybooks', withAuth, (req, res) => {
  res.render('mybooks', { title: 'My Books', booksPage: true, books: [] });
});

router.get('/mycocktails', withAuth, (req, res) => {
  res.render('mycocktails', { title: 'My Cocktails', cocktailsPage: true, cocktails: [] });
});

module.exports = router;
