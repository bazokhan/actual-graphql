'use strict';
module.exports = sequelize => {
  const Service = sequelize.define('Service', {}, {});
  Service.associate = models => {
    Service.belongsTo(models.User, { as: 'owner', foreignKey: 'ownerId' });
    Service.hasMany(models.Account, { foreignKey: 'serviceId' });
    Service.hasMany(models.Category, { foreignKey: 'serviceId' });
    Service.hasMany(models.Group, { foreignKey: 'serviceId' });
    Service.hasMany(models.Invoice, { foreignKey: 'serviceId' });
    Service.hasMany(models.Payee, { foreignKey: 'serviceId' });
    Service.hasMany(models.Product, { foreignKey: 'serviceId' });
    Service.hasMany(models.Transaction, { foreignKey: 'serviceId' });
  };
  return Service;
};
