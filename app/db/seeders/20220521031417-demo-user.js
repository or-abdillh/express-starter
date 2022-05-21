'use strict';

const md5 = require('md5')

module.exports = {
  async up (queryInterface, Sequelize) {
    
    const fields = [
      {
        username: 'sandhika2340',
        password: md5('12345678'),
        fullname: 'Sandhika Galih',
        email: 'sandhika.23@gmail.com',
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ]
    await queryInterface.bulkInsert('users', fields, {})
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
