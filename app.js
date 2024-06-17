const dotenv = require("dotenv");
dotenv.config();

const express = require("express");
const exphbs = require("express-handlebars");
const session = require("express-session");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const routes = require("./routes");

const app = express();
const PORT = process.env.PORT || 3000;

// Set up Handlebars.js as the template engine
app.engine("handlebars", exphbs.engine({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

// Middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false },
  })
);

// Static files
app.use(express.static("public"));

// Sync database
const db = require("./models");

db.sequelize.sync({ force: false }).then(() => {
  console.log("Database & tables created!");
});

// Routes
app.use(routes);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
