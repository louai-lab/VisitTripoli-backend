'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.removeColumn('Requests', 'date')
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.addColumn('Requests', 'date', {
      type: Sequelize.DATE,
      allowNull: false
    })
  }
};
