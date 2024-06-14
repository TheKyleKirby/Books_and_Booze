const router = require('express').Router();

const cocktailRoutes = require('./cocktails');
const bookRoutes = require('./book');

router.use('/cocktails', cocktailRoutes);
router.use('/books', bookRoutes);

module.exports = router;