const Item = require('./item');
const User = require('./user');

User.hasMany(Item);
Item.belongsTo(User);

module.exports = { Item, User };