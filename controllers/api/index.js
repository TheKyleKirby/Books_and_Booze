const router = require('express').Router();
const bookRoutes = require('./book');
const cocktailsRoutes = require('./cocktailsRoutes');

router.use('/book', bookRoutes);
router.use('/cocktails', cocktailsRoutes);

module.exports = router;
