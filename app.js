const dotenv = require('dotenv');
dotenv.config();

const express = require('express');
const exphbs = require('express-handlebars');
const session = require('express-session');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const routes = require('./controllers');

const app = express();
const PORT = 3000; 

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
app.use(routes);
// const authRoutes = require('./routes/authRoutes');
// const itemRoutes = require('./routes/itemRoutes');

// app.use('/auth', authRoutes);
// app.use('/items', itemRoutes);

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


// Node Mailer
const nodemailer = require("nodemailer");

// Node Mailer Transporter
const transporter = nodemailer.createTransport({
    host: 'smtp.example.com',
    port: 587,
    secure: false,
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

// Welcome Email 
const welcomeEmail = {
    from: 'booksbooze3@gmail.com',
    to: 'recipient@example.com',
    subject: 'Hello from Books and Booze',
    text: "Welcome to Books and Booze!",
    html: <p> <b>'Thanks for joining Books and Booze, remember to be kind' </b></p>
 };

transporter.sendMail(welcomeEmail, (error, info) => {
    if (error) {
        return console.log(error);
    }
    console.log('Email Sent: %s', info.messageId);
    console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
});
