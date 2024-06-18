const express = require("express");
const router = express.Router();

// Home page route (redirects to login)
router.get("/", (req, res) => {
  res.redirect("/login");
});

// Login page route
router.get("/login", (req, res) => {
  res.render("login", { title: "Login" });
});

// Signup page route
router.get("/signup", (req, res) => {
  res.render("signup", { title: "Signup" });
});

// My Books page route
router.get("/mybooks", (req, res) => {
  
  res.render("mybooks", { title: "My Books", books: [] });
});

// My Cocktails page route
router.get("/mycocktails", (req, res) => {
 
  res.render("mycocktails", { title: "My Cocktails", cocktails: [] });
});

// Home route after login or signup
router.get("/home", (req, res) => {
  res.render("home", { title: "Home" });
});

module.exports = router;

