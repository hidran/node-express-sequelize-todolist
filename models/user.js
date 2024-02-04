'use strict';
const {Model} = require('sequelize');
const bc = require('bcrypt');
module.exports = (sequelize, DataTypes) => {
    class User extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            User.hasMany(models.List);
        }
    }

    User.init(
        {
            name: {
                type: DataTypes.STRING,
                allowNull: false,
                index: true,
                validate: {
                    notEmpty: {
                        msg: 'Column name cannot be empty',
                    },
                    len: {
                        args: [6, 255],
                        msg: 'Name length must be between 6 and 255',
                    },
                },
            },
            email: {
                type: DataTypes.STRING,
                index: true,
                allowNull: false,
                unique: {
                    args: true,
                    msg: 'Email already taken!',
                },
                validate: {
                    notEmpty: {
                        msg: 'Column name cannot be empty',
                    },
                    isEmail: {
                        msg: 'Please add a valid email',
                    },
                },
            },
            password: {
                type: DataTypes.STRING,
                allowNull: false,
                validate: {
                    notEmpty: {
                        msg: 'Column name cannot be empty',
                    },
                    len: {
                        args: [6, 255],
                        msg: 'Name length must be between 6 and 255',
                    },
                },
            },
        },

        {
            hooks: {
                beforeCreate(user) {
                    user.password = bc.hashSync(user.password, 12)
                }
            },
            sequelize,
            modelName: 'User',
            tableName: 'users',
            underscored: true,
        }
    );
    return User;
};
