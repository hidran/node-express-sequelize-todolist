'use strict';
const User = require('./user');
const {Model} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class List extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            List.belongsTo(models.User, {foreignKey: 'userId'});
            List.hasMany(models.Todo);
        }
    }

    List.init(
        {
            name: {
                type: DataTypes.STRING,
                allowNull: false,
                unique: true,
                validate: {
                    notEmpty: {
                        msg: 'Column name cannot be empty'
                    },
                    len: {
                        args: [6, 255],
                        msg: 'Name length must be between 6 and 255'
                    }
                }
            },

            userId: {
                type: DataTypes.INTEGER,
                allowNull: false,
                index: true,
                references: {
                    model: 'users',
                },
            },
        },
        {
            sequelize,
            modelName: 'List',
            tableName: 'lists',
            underscored: true,
        }
    );
    return List;
};
