'use strict';

const {DataTypes} = require('sequelize');


module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable('todos', {
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
                index: true,

                references: {
                    model: {
                        tableName: 'lists'
                    },
                    key: 'id'

                },
                onDelete: 'CASCADE',
                onUpdate: 'SET NULL'
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
        await queryInterface.sequelize.query('SET FOREIGN_KEY_CHECKS = 0')

        await queryInterface.dropTable('todos');
        await queryInterface.sequelize.query('SET FOREIGN_KEY_CHECKS = 1')

    }
};
