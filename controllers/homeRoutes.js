const router = require('express').Router();
const withAuth = require('../middlewares/authMiddleware');

router.get('/', (req, res) => {
  res.redirect('/login');
});

router.get('/login', (req, res) => {
  if (req.session.user_id) {
    res.redirect('/home');
    return;
  }
  res.render('auth'); 
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

router.get('/mydrinks', withAuth, (req, res) => {
  res.render('mydrinks', { title: 'My Drinks', drinksPage: true, drinks: [] });
});

router.get('/mylibrary', withAuth, (req, res) => {
  res.render('mylibrary', { title: 'My Library', libraryPage: true, library: [] });
});

module.exports = router;
