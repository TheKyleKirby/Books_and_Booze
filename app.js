const path = require('path');
const express = require('express');
const session = require('express-session');
const exphbs = require('express-handlebars');
// const bodyParser = require('body-parser');
// const cookieParser = require('cookie-parser');
const routes = require('./controllers'); // Ensure the correct path
// const db = require('./models'); // Importing db from models


const sequelize = require('./config/database');
const SequelizeStore = require('connect-session-sequelize')(session.Store);


const app = express();
const PORT = process.env.PORT || 3000;

// Set up Handlebars.js

app.engine('handlebars', exphbs.engine());
app.set('view engine', 'handlebars');
// const hbs = exphbs.create({ helpers });

const sess = {
  secret: 'Super secret secret',
  cookie: {
    maxAge: 300000,
    httpOnly: true,
    secure: false,
    sameSite: 'strict',
  },
  resave: false,
  saveUninitialized: true,
  store: new SequelizeStore({
    db: sequelize
  })
};

app.use(session(sess));

// Middleware
// app.use(bodyParser.urlencoded({ extended: false }));
// app.use(bodyParser.json());
// app.use(cookieParser());
app.use(session({
    secret: 'mySuperSecretSessionKey123456!',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false } // Set to true if using HTTPS
}));

// Static files
app.use(express.static(path.join(__dirname, 'public')));

// Sync database
sequelize.sync({ force: false }).then(() => {
    console.log('Database & tables created!');
}).catch(error => console.error('Unable to sync the database:', error));

// Routes
app.use(routes);

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
