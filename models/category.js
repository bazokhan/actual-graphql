'use strict';
module.exports = (sequelize, DataTypes) => {
  const Category = sequelize.define(
    'Category',
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
  Category.associate = models => {
    Category.hasMany(models.Transaction, { foreignKey: 'category' });
    Category.belongsTo(models.CategoryGroup, { foreignKey: 'catGroup' });
  };
  return Category;
};
