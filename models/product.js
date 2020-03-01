'use strict';
module.exports = (sequelize, DataTypes) => {
  const Product = sequelize.define(
    'Product',
    {
      name: {
        type: DataTypes.STRING,
        allowNull: false
      },
      tombstone: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0
      }
    },
    {}
  );
  Product.associate = models => {
    Product.belongsToMany(models.Invoice, { through: 'InvoiceProducts' });
    Product.belongsTo(models.Service, { foreignKey: 'serviceId' });
  };
  return Product;
};
