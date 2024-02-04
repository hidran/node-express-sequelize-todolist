'use strict';
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable('users', {
                id: {
                    allowNull: false,
                    autoIncrement: true,
                    primaryKey: true,
                    type: Sequelize.INTEGER
                },
                name: {
                    type: Sequelize.STRING,
                    allowNull: false,
                    index: true
                },
                email: {
                    type: Sequelize.STRING,
                    allowNull: false,
                    index: true,
                    unique: true
                },
                password: {
                    type: Sequelize.STRING,
                    allowNull: false
                },
                created_at: {
                    allowNull: false,
                    type: Sequelize.DATE
                },
                updated_at: {
                    allowNull: false,
                    type: Sequelize.DATE
                }
            }
        );
    },
    async down(queryInterface, Sequelize) {
        await queryInterface.sequelize.query('SET FOREIGN_KEY_CHECKS = 0')

        await queryInterface.dropTable('users');
        await queryInterface.sequelize.query('SET FOREIGN_KEY_CHECKS = 1')

    }
};
