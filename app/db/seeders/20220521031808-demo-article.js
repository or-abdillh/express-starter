'use strict';

require('dotenv').config({ path: `${process.cwd()}/.env` })

module.exports = {
  async up (queryInterface, Sequelize) {
    
    await queryInterface.bulkInsert('articles', [
      {
        title: 'Quam. Phasellus placerat. In sem nisl, elementum vitae, venenatis nec, lacinia ac, arcu. Pellentesque gravida egestas.',
        content: `
          Porta. Etiam facilisis. Nam suscipit. Ut consectetuer leo vehicula augue. Aliquam cursus. Integer pharetra rhoncus massa. Cras et ligula vel quam tristique commodo. Sed est lectus, mollis quis, lacinia id, sollicitudin nec, eros. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Morbi urna dui, fermentum quis, feugiat imperdiet, imperdiet id, sapien.
        `,
        image: 'http://localhost:8000/images/IMAGE-1653565092521.jpg',
        username: 'sandhika2340',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        title: 'Quam. Phasellus placerat. In sem nisl, elementum vitae, venenatis nec, lacinia ac, arcu. Pellentesque gravida egestas.',
        content: `
          Porta. Etiam facilisis. Nam suscipit. Ut consectetuer leo vehicula augue. Aliquam cursus. Integer pharetra rhoncus massa. Cras et ligula vel quam tristique commodo. Sed est lectus, mollis quis, lacinia id, sollicitudin nec, eros. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Morbi urna dui, fermentum quis, feugiat imperdiet, imperdiet id, sapien.
        `,
        image: 'http://localhost:8000/images/IMAGE-1653565092521.jpg',
        username: 'sandhika2340',
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ], {})
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
