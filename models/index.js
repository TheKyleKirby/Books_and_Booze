// const Sequelize = require('sequelize');
// const dotenv = require('dotenv');
const User = require('./user');

// dotenv.config();

// const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASSWORD, {
//     host: process.env.DB_HOST,
//     dialect: 'postgres'
// });

// const db = {};

// db.Sequelize = Sequelize;
// db.sequelize = sequelize;

// // Import models
// db.User = require('./user')(sequelize, Sequelize);
// db.Item = require('./item')(sequelize, Sequelize);

// module.exports = db;
module.exports = { User};