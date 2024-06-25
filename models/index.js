const User = require('./user');
const Item = require('./item');

User.hasMany(Item, {
  foreignKey: 'userId',
  onDelete: 'CASCADE',
});

Item.belongsTo(User, {
  foreignKey: 'userId',
});

module.exports = { User, Item };
