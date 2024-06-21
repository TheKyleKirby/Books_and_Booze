const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/database');

class Item extends Model {}

Item.init({
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    description: {
        type: DataTypes.STRING,
        allowNull: true
    }
}, {
    sequelize,
    modelName: 'item',
    timestamps: true
});

module.exports = Item;

