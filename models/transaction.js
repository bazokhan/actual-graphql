'use strict';
module.exports = (sequelize, DataTypes) => {
  const Transaction = sequelize.define(
    'Transaction',
    {
      amount: {
        type: DataTypes.FLOAT,
        allowNull: false
      },
      notes: {
        type: DataTypes.STRING,
        allowNull: true
      },
      date: {
        type: DataTypes.INTEGER,
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
  Transaction.associate = models => {
    Transaction.belongsTo(models.Account, { foreignKey: 'acct' });
    Transaction.belongsTo(models.Category, { foreignKey: 'category' });
    Transaction.belongsTo(models.Payee, { foreignKey: 'payeeId' });
  };
  return Transaction;
};
