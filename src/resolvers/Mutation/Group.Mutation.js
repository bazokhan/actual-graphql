const uuidv1 = require('uuid/v1');

module.exports = {
  createGroup: async (root, { group: { isIncome, name } }, { models }) =>
    isIncome
      ? models.Group.create({
          id: uuidv1(),
          isIncome: 1,
          name,
          tombstone: 0
        })
      : models.Group.create({
          id: uuidv1(),
          isIncome: 0,
          name,
          tombstone: 0
        }),
  createGroups: async (root, { groups }, { models }) => {
    return groups.reduce(async (prev, { isIncome, name }) => {
      prev = await prev;
      const createdGroup = isIncome
        ? await models.Group.create({
            id: uuidv1(),
            isIncome: 1,
            name,
            tombstone: 0
          })
        : await models.Group.create({
            id: uuidv1(),
            isIncome: 0,
            name,
            tombstone: 0
          });
      if (createdGroup) {
        prev.push(createdGroup);
      }
      return prev;
    }, []);
  },
  deleteGroup: async (root, { id }, { models }) => {
    const targetGroup = await models.Group.findOne({ where: { id } });
    if (!targetGroup) return null;
    const hasCategories = await targetGroup.countCategories({
      where: { tombstone: 0 }
    });
    console.log(hasCategories);
    if (hasCategories) {
      return new Error("This group has categories. It can't be deleted.");
    }
    return targetGroup.update({
      tombstone: 1
    });
  }
};