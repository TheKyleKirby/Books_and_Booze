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

// Cocktail API
const { getCocktails } = require('./controllers/api/cocktails');

app.get('/cocktails/:searchTerm', async (req, res) => {
  const searchTerm = req.params.searchTerm;
  console.log(`Received request for cocktails with search term: ${searchTerm}`);
  const cocktails = await getCocktails(searchTerm);
  if (cocktails) {
    res.json(cocktails);
  } else {
    res.status(500).json({ error: 'An error occurred while fetching the data.' });
  }
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});