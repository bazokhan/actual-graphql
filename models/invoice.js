'use strict';
module.exports = (sequelize, DataTypes) => {
  const Invoice = sequelize.define(
    'Invoice',
    {
      amountDue: {
        type: DataTypes.FLOAT,
        allowNull: false
      },
      dateDue: {
        type: DataTypes.INTEGER,
        allowNull: true
      },
      tombstone: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0
      }
    },
    {}
  );
  Invoice.associate = models => {
    Invoice.hasMany(models.Transaction, { foreignKey: 'invoiceId' });
    Invoice.belongsToMany(models.Product, { through: 'InvoiceProducts' });
    Invoice.belongsTo(models.Service, { foreignKey: 'serviceId' });
  };
  return Invoice;
};
