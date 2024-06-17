const db = require("../models");
const Item = db.Item;

// Get all items
const getAllItems = async (req, res) => {
  try {
    const items = await Item.findAll();
    res.status(200).json(items);
  } catch (error) {
    console.error("Error getting items:", error);
    res.status(500).json({ error: error.message });
  }
};

// Add a new item
const addItem = async (req, res) => {
  try {
    const { name, description } = req.body;
    const item = await Item.create({ name, description });
    res.status(201).json(item);
  } catch (error) {
    console.error("Error adding item:", error);
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  getAllItems,
  addItem,
};
