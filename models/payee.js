'use strict';
module.exports = (sequelize, DataTypes) => {
  const Payee = sequelize.define(
    'Payee',
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
  Payee.associate = models => {
    Payee.hasMany(models.Transaction, { foreignKey: 'payeeId' });
    Payee.belongsTo(models.Account, { foreignKey: 'transferAccount' });
    Payee.belongsTo(models.Service, { foreignKey: 'serviceId' });
  };
  return Payee;
};
