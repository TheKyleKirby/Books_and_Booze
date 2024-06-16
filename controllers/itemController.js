const router = require('express').Router();
const path = require('path');
const { Pool } = require('pg');

const pool = new Pool({
  user: process.env.DB_NAME,
  host: process.env.DB_HOST,
  database: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
});

router.get('/', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM items');
    const data = result.rows;
    res.render('main', { items: data });
  } catch (error) {
    console.error(error);
    res.status(500).send('Error fetching data');
  }
});

module.exports = router;

// const db = require('../models');
// const Item = db.Item;

// // Get all items
// const getAllItems = async (req, res) => {
//     try {
//         const items = await Item.findAll();
//         res.status(200).json(items);
//     } catch (error) {
//         console.error('Error getting items:', error);
//         res.status(500).json({ error: error.message });
//     }
// };

// // Add a new item
// const addItem = async (req, res) => {
//     try {
//         const { name, description } = req.body;
//         const item = await Item.create({ name, description });
//         res.status(201).json(item);
//     } catch (error) {
//         console.error('Error adding item:', error);
//         res.status(500).json({ error: error.message });
//     }
// };

// module.exports = {
//     getAllItems,
//     addItem
// };
