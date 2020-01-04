"use strict";
module.exports = (sequelize, DataTypes) => {
  const CategoryGroup = sequelize.define(
    "CategoryGroup",
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
  CategoryGroup.associate = models => {
    CategoryGroup.hasMany(models.Category);
  };
  return CategoryGroup;
};
