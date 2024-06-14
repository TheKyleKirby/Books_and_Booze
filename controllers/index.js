const router = require('express').Router();

// const apiRoutes = require('./api');
// const itemController = require('./itemController');
// const authController = require('./authController');
const homeRoutes = require('./homeRoutes');

router.use('/', homeRoutes);
// router.use('/api', apiRoutes);

module.exports = router;
