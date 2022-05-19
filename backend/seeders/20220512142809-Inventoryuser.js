('use strict');

const bcrypt = require('bcrypt');

const salt = bcrypt.genSaltSync(10);
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.bulkInsert(
            'Inventoryusers',
            [
                {
                    email: 'user1@gmail.com',
                    username: 'user1user1',
                    password: bcrypt.hashSync('user1user1', salt),
                    name: 'user1user1',
                    createdAt: new Date(),
                    updatedAt: new Date(),
                },
                {
                    email: 'user2@gmail.com',
                    username: 'user2user2',
                    password: bcrypt.hashSync('user2user2', salt),
                    name: 'user1user1',
                    createdAt: new Date(),
                    updatedAt: new Date(),
                },
                {
                    email: 'user3@gmail.com',
                    username: 'user3user3',
                    password: bcrypt.hashSync('user3user3', salt),
                    name: 'user3user3',
                    createdAt: new Date(),
                    updatedAt: new Date(),
                },
            ],
            {}
        );
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
