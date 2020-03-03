const { create, migrate, remove } = require('./middlewares');

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

  // For migration purpose only
  migrateCategory: async (
    root,
    { category: { id, groupId, name, tombstone } },
    context
  ) => {
    try {
      const { author, models } = context;
      const alreadyExists = await models.Category.findByPk(id);
      if (alreadyExists) return new Error('Already existing!');
      const service = await author.getService();
      const groups = await service.getGroups({
        where: { id: groupId, tombstone: 0 }
      });
      if (!groups || !groups.length) return new Error('No Group Found!');
      const group = groups[0];

      return migrate(
        'Category',
        { id, isIncome: group.isIncome || 0, name, groupId, tombstone },
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

  deleteCategory: async (root, { id }, context) => {
    const validator = async category => {
      try {
        const hasTransactions = await category.countTransactions({
          where: { tombstone: 0 }
        });
        if (hasTransactions) {
          return new Error(
            "This category has transactions. It can't be deleted."
          );
        }
        return true;
      } catch (err) {
        console.log(err);
        return false;
      }
    };

    return remove('Category', id, context, validator);
  }
};
