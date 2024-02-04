'use strict';
const { faker } = require('@faker-js/faker');
faker.locale = 'it';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        for (let i = 1; i <= 10; i++) {
            for (let j = 1; j <= 10; j++) {
                await queryInterface.bulkInsert(
                    'todos',
                    [
                        {
                            todo: faker.lorem.sentence(),
                            list_id: i,
                            completed: faker.datatype.boolean(),
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
