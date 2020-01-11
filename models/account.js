'use strict';
module.exports = (sequelize, DataTypes) => {
  const Account = sequelize.define(
    'Account',
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
  Account.associate = models => {
    Account.hasMany(models.Transaction, { foreignKey: 'acct' });
    Account.belongsTo(models.User, { foreignKey: 'userId' });
  };
  return Account;
};
