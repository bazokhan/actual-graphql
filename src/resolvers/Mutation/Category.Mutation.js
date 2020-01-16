const uuidv1 = require('uuid/v1');

module.exports = {
  createCategory: async (root, { category: { groupId, name } }, { models }) => {
    const categoryGroup = await models.CategoryGroup.findByPk(groupId);
    return models.Category.create({
      id: uuidv1(),
      isIncome: categoryGroup.isIncome || 0,
      name,
      catGroup: groupId,
      tombstone: 0
    });
  },
  createCategories: async (root, { categories }, { models }) => {
    return categories.reduce(async (prev, { groupId, groupName, name }) => {
      prev = await prev;
      let categoryGroups;
      if (groupId) {
        categoryGroups = await models.CategoryGroup.findAll({
          where: {
            id: groupId
          }
        });
      } else if (groupName) {
        categoryGroups = await models.CategoryGroup.findAll({
          where: {
            name: groupName
          }
        });
      }
      if (!categoryGroups || !categoryGroups.length) {
        return new Error("Couldn't find corresponding category groups");
      }
      const createdCategory = await models.Category.create({
        id: uuidv1(),
        isIncome: categoryGroups[0].isIncome || 0,
        name,
        catGroup: categoryGroups[0].id,
        tombstone: 0
      });

      if (createdCategory) {
        prev.push(createdCategory);
      }
      return prev;
    }, []);
  },
  deleteCategory: async (root, { id }, { models }) => {
    const targetCategory = await models.Category.findOne({ where: { id } });
    if (!targetCategory) return null;
    const hasTransactions = await targetCategory.countTransactions();
    console.log(hasTransactions);
    if (hasTransactions) {
      return new Error("This category has transactions. It can't be deleted.");
    }
    return targetCategory.update({
      tombstone: 1
    });
  }
};
