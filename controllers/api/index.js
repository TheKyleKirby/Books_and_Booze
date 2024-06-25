const router = require('express').Router();
const booksRoutes = require('./booksRoutes');
const cocktailsRoutes = require('./cocktailsRoutes');
const userRoutes = require('./usersRoutes');

router.use('/books', booksRoutes);
router.use('/cocktails', cocktailsRoutes);
router.use('/users', userRoutes);

module.exports = router;
