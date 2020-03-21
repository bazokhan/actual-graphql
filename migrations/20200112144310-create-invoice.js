'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Invoices', {
      id: {
        allowNull: false,
        autoIncrement: false,
        primaryKey: true,
        type: Sequelize.STRING
      },
      serviceId: {
        allowNull: false,
        type: Sequelize.STRING
      },
      amountDue: {
        allowNull: false,
        type: Sequelize.FLOAT
      },
      dateDue: {
        allowNull: true,
        type: Sequelize.INTEGER
      },
      tombstone: {
        allowNull: false,
        type: Sequelize.INTEGER
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },

  down: queryInterface => {
    try {
      return queryInterface.dropTable('Invoices');
    } catch (err) {
      console.log(err);
    }
  }
};
