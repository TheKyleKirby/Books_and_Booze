const express = require('express');
const router = express.Router();
try {
    const bookRoutes = require('./bookRoutes');
    router.use('/books', bookRoutes);
    console.log("Book routes loaded successfully");
} catch (error) {
    console.error("Error loading book routes:", error);
}
try {
    const cocktailRoutes = require('./cocktailRoutes');
    router.use('/cocktails', cocktailRoutes);
    console.log("Cocktail routes loaded successfully");
} catch (error) {
    console.error("Error loading cocktail routes:", error);
}
try {
    const homeRoutes = require('../controllers/homeRoutes');
    router.use('/', homeRoutes);
    console.log("Home routes loaded successfully");
} catch (error) {
    console.error("Error loading home routes:", error);
}
try {
    const authRoutes = require('./authRoutes');
    router.use('/auth', authRoutes);
    console.log("Auth routes loaded successfully");
} catch (error) {
    console.error("Error loading auth routes:", error);
}
try {
    const itemRoutes = require('./itemRoutes');
    router.use('/items', itemRoutes);
    console.log("Item routes loaded successfully");
} catch (error) {
    console.error("Error loading item routes:", error);
}
module.exports = router;