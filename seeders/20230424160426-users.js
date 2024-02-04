'use strict';
const { faker } = require('@faker-js/faker');
faker.locale = 'it';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        for (let i = 0; i < 50; i++) {
            await queryInterface.bulkInsert(
                'users',
                [
                    {
                        name: faker.name.fullName(),
                        email: faker.internet.email(),
                        password: faker.internet.password(),
                        created_at: new Date(),
                        updated_at: new Date(),
                    },
                ],
                {}
            );
        }
    },

    async down(queryInterface, Sequelize) {
        /**
         * Add commands to revert seed here.
         *
         * Example:
         * await queryInterface.bulkDelete('People', null, {});
         */
    },
};
