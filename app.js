

const dotenv = require('dotenv');
dotenv.config();

const express = require('express');


const app = express();


const db = require('./models');

db.sequelize.sync({ force: false }).then(() => {
    console.log('Database & tables created!');
});
