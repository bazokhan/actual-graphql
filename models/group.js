'use strict';
module.exports = (sequelize, DataTypes) => {
  const Group = sequelize.define(
    'Group',
    {
      name: {
        type: DataTypes.STRING,
        allowNull: false
      },
      isIncome: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0
      },
      tombstone: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0
      }
    },
    {}
  );
  Group.associate = models => {
    Group.hasMany(models.Category, { foreignKey: 'groupId' });
  };
  return Group;
};
