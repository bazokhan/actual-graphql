'use strict';
module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define(
    'User',
    {
      name: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false
      },
      role: {
        allowNull: false,
        type: DataTypes.STRING
      },
      email: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false
      },
      password: {
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
  User.associate = models => {
    User.hasOne(models.Service, { as: 'owner', foreignKey: 'ownerId' });
    User.belongsToMany(models.Service, { through: 'ServiceContributors' });
  };
  return User;
};
