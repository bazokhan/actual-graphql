'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('InvoiceProducts', {
      invoiceId: {
        allowNull: false,
        type: Sequelize.STRING
      },
      productId: {
        allowNull: false,
        type: Sequelize.STRING
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
      return queryInterface.dropTable('InvoiceProducts');
    } catch (err) {
      console.log(err);
    }
  }
};
