const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class Inventoryuser extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            Inventoryuser.hasMany(models.Inventoryitem, {
                foreignKey: 'userId',
                as: 'inventoryitems',
            });
        }
    }
    Inventoryuser.init(
        {
            email: DataTypes.STRING,
            username: DataTypes.STRING,
            password: DataTypes.STRING,
            name: DataTypes.STRING,
        },
        {
            sequelize,
            modelName: 'Inventoryuser',
        }
    );
    return Inventoryuser;
};
