const { create, migrate } = require('./middlewares');

module.exports = {
  createGroup: async (root, { group: { isIncome, name } }, context) => {
    try {
      const { author } = context;
      const service = await author.getService();
      const groups = await service.getGroups({ where: { tombstone: 0 } });
      if (groups && groups.map(group => group.name).includes(name)) {
        return new Error('Already has a group with this name');
      }
      return create('Group', { name, isIncome: Number(isIncome) }, context);
    } catch (err) {
      console.log(err);
      return null;
    }
  },

  // For migration purpose only
  migrateGroup: async (
    root,
    { group: { id, isIncome, name, tombstone } },
    context
  ) => {
    try {
      return migrate(
        'Group',
        { id, name, isIncome: Number(isIncome), tombstone },
        context
      );
    } catch (err) {
      console.log(err);
      return null;
    }
  },

  deleteGroup: async (root, { id }, { models }) => {
    const targetGroup = await models.Group.findOne({ where: { id } });
    if (!targetGroup) return null;
    const hasCategories = await targetGroup.countCategories({
      where: { tombstone: 0 }
    });
    if (hasCategories) {
      return new Error("This group has categories. It can't be deleted.");
    }
    return targetGroup.update({
      tombstone: 1
    });
  }
};
