const dotenv = require('dotenv');
dotenv.config();

const express = require('express');
const exphbs = require('express-handlebars');
const session = require('express-session');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');

const app = express();
const PORT = 3000; // Or any other port you want to use

// Set up Handlebars.js as the template engine
app.engine('handlebars', exphbs.engine());
app.set('view engine', 'handlebars');

// Middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(session({
    secret: 'mySuperSecretSessionKey123456!', // Directly setting the session secret
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false } // Set to true if using HTTPS
}));

// Static files
app.use(express.static('public'));

// Sync database
const db = require('./models');

db.sequelize.sync({ force: false }).then(() => {
    console.log('Database & tables created!');
});

// Routes
const authRoutes = require('./routes/authRoutes');
const itemRoutes = require('./routes/itemRoutes');

app.use('/auth', authRoutes);
app.use('/items', itemRoutes);

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

// const express = require('express');
const axios = require('axios');
// const app = express();
//const port = 3000;
//Books API
const getBooks = async (searchTerm) => {
  try {
    const response = await axios.get(`https://www.googleapis.com/books/v1/volumes?q=${searchTerm}`);
    const books = response.data.items.map(book => ({
      title: book.volumeInfo.title,
      authors: book.volumeInfo.authors,
      publisher: book.volumeInfo.publisher,
    }));
    return books;
  } catch (error) {
    console.error(`Error: ${error}`);
  }
};
//Cocktail API
app.get('/books/:searchTerm', async (req, res) => {
  const books = await getBooks(req.params.searchTerm);
  res.json(books);
});

const getCocktail = async (searchTerm) => {
  try {
    const response = await axios.get(`http://www.thecocktaildb.com/api/json/v1/1/search.php?s=${searchTerm}`);
    const cocktails = response.data.drinks.map(cocktail => ({
      name: cocktail.strDrink,
      category: cocktail.strCategory,
      instructions: cocktail.strInstructions,
      ingredients: [
        cocktail.strIngredient1,
        cocktail.strIngredient2,
        cocktail.strIngredient3,
        cocktail.strIngredient4,
        cocktail.strIngredient5,
        cocktail.strIngredient6,
      ],
      thumbnail:cocktail.strDrinkThumb,
    }));
    return cocktails;
  } catch (error) {;
    console.error(`Cocktail not found: ${error}`);
    throw error;
  }
};

app.get('/cocktails/:searcTerm', async (req, res) => {
  try {
    const cocktails = await getCocktail(req.params.searchTerm);
    res.json(cocktails);
  } catch (error) {
    res.status(500).json({ error: 'An error occoured while fetching cocktails'});
  }
});
