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