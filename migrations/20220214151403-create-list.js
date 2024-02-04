'use strict';

module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable('lists', {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER
            },
            name: {
                type: Sequelize.STRING,
                allowNull: false,
                unique: true
            },
            user_id: {
                type: Sequelize.INTEGER,
                index: true,
                references: {
                    model: {
                        tableName: 'users'
                    },
                    key: 'id',

                },
                onDelete: 'CASCADE',
                onUpdate: 'SET NULL'
            },
            created_at: {
                allowNull: false,
                type: Sequelize.DATE
            },
            updated_at: {
                allowNull: false,
                type: Sequelize.DATE
            }
        });
    },
    async down(queryInterface, Sequelize) {
        await queryInterface.sequelize.query('SET FOREIGN_KEY_CHECKS = 0')

        await queryInterface.dropTable('lists');
        await queryInterface.sequelize.query('SET FOREIGN_KEY_CHECKS = 1')

    }
};
