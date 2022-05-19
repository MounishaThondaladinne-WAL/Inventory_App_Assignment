const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class Inventoryitem extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            Inventoryitem.belongsTo(models.Inventoryuser, {
                foreignKey: 'userId',
                onDelete: 'CASCADE',
            });
        }
    }
    Inventoryitem.init(
        {
            image: DataTypes.STRING,
            quantity: DataTypes.INTEGER,
            name: DataTypes.STRING,
            price: DataTypes.INTEGER,
            description: DataTypes.STRING,
        },
        {
            sequelize,
            modelName: 'Inventoryitem',
        }
    );
    return Inventoryitem;
};
