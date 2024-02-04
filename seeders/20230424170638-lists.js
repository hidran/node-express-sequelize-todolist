'use strict';
const { faker } = require('@faker-js/faker');
faker.locale = 'it';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        for (let i = 1; i <= 50; i++) {
            for (let j = 1; j <= 10; j++) {
                await queryInterface.bulkInsert(
                    'lists',
                    [
                        {
                            name: faker.lorem.sentence(),
                            user_id: i,
                            created_at: new Date(),
                            updated_at: new Date(),
                        },
                    ],
                    {}
                );
            }
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
