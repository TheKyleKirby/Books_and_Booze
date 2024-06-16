module.exports = (sequelize, DataTypes) => {
    const Item = sequelize.define('Item', {
        name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        description: {
            type: DataTypes.STRING,
            allowNull: true
        }
    }, {
        timestamps: true,
        createdAt: 'createdAt',
        updatedAt: 'updatedAt'
    });

    Item.associate = (models) => {
        Item.belongsTo(models.User, {
            foreignKey: 'userId',
            as: 'user'
        });
    };

    return Item;
};