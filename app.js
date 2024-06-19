const sequelize = require('./config/database');
const express = require('express');
const exphbs = require('express-handlebars');
const session = require('express-session');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const routes = require('./routes'); // Ensure the correct path
const db = require('./models'); // Importing db from models

const app = express();
const PORT = process.env.PORT || 3000;

// Set up Handlebars.js as the template engine
app.engine('handlebars', exphbs.engine());
app.set('view engine', 'handlebars');

// Middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(session({
    secret: 'mySuperSecretSessionKey123456!',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false } // Set to true if using HTTPS
}));

// Static files
app.use(express.static('public'));

// Sync database
sequelize.sync({ force: false }).then(() => {
    console.log('Database & tables created!');
}).catch(error => console.error('Unable to sync the database:', error));

// Routes
app.use(routes);

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
