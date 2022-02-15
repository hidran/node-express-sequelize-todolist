'use strict';
const {
    Model
} = require('sequelize');

const List = require('../models/list');
module.exports = (sequelize, DataTypes) => {
    // 
    class Todo extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            Todo.belongsTo(models.List, { foreignKey: 'listId' })
        }
    }
    Todo.init({
        todo: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        listId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            index: true,
            references: {
                model: 'lists'
            }
        },
        completed: DataTypes.BOOLEAN
    }, {
        sequelize,
        modelName: 'Todo',
        tableName: 'todos',
        underscored: true
    });
    return Todo;
};