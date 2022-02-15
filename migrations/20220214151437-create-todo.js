'use strict';

const { DataTypes } = require('sequelize/types');


module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Todos', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      todo: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      list_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        index: true,
        references: {
          model: List,
          key: 'id'
        }
      },
      completed: {
        type: Sequelize.BOOLEAN,
        defaultValue: false
      },
      created_at: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: DataTypes.NOW
      },
      updated_at: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Todos');
  }
};