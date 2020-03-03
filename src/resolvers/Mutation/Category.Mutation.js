const uuidv1 = require('uuid/v1');
const { create } = require('./middlewares');

module.exports = {
  createCategory: async (root, { category: { groupId, name } }, context) => {
    try {
      const { author } = context;
      const service = await author.getService();
      const categories = await service.getCategories({
        where: { groupId, tombstone: 0 }
      });
      const groups = await service.getGroups({
        where: { id: groupId, tombstone: 0 }
      });
      if (!groups || !groups.length) return new Error('No Group Found!');
      const group = groups[0];
      if (
        categories &&
        categories.map(category => category.name).includes(name)
      ) {
        return new Error('Already has a category with this name');
      }
      return create(
        'Category',
        { isIncome: group.isIncome || 0, name, groupId },
        context
      );
    } catch (err) {
      console.log(err);
      return null;
    }
  },

  updateCategory: async (root, { id, category }, { models }) => {
    let target;
    try {
      target = await models.Category.findByPk(id);
      Object.keys(category).reduce(async (prev, key) => {
        prev = await prev;
        await prev.update({ [key]: category[key] });
        return prev;
      }, target);
    } catch (ex) {
      console.log(ex);
    }
    return target;
  },

  // For migration purpose only
  createCategories: async (root, { categories }, { models }) => {
    return categories.reduce(
      async (prev, { groupId, groupName, name, tombstone }) => {
        prev = await prev;
        let groups;
        if (groupId) {
          groups = await models.Group.findAll({
            where: {
              id: groupId
            }
          });
        } else if (groupName) {
          groups = await models.Group.findAll({
            where: {
              name: groupName
            }
          });
        }
        if (!groups || !groups.length) {
          return new Error("Couldn't find corresponding groups");
        }
        const createdCategory = await models.Category.create({
          id: uuidv1(),
          isIncome: groups[0].isIncome || 0,
          name,
          groupId: groups[0].id,
          tombstone
        });

        if (createdCategory) {
          prev.push(createdCategory);
        }
        return prev;
      },
      []
    );
  },
  deleteCategory: async (root, { id }, { models }) => {
    const targetCategory = await models.Category.findOne({ where: { id } });
    if (!targetCategory) return null;
    const hasTransactions = await targetCategory.countTransactions({
      where: { tombstone: 0 }
    });
    if (hasTransactions) {
      return new Error("This category has transactions. It can't be deleted.");
    }
    return targetCategory.update({
      tombstone: 1
    });
  }
};
