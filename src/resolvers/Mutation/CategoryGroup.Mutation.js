const uuidv1 = require('uuid/v1');

module.exports = {
  createCatGroup: async (root, { group: { isIncome, name } }, { models }) =>
    isIncome
      ? models.CategoryGroup.create({
          id: uuidv1(),
          isIncome: 1,
          name,
          tombstone: 0
        })
      : models.CategoryGroup.create({
          id: uuidv1(),
          isIncome: 0,
          name,
          tombstone: 0
        }),
  createCatGroups: async (root, { groups }, { models }) => {
    return groups.reduce(async (prev, { isIncome, name }) => {
      prev = await prev;
      const createdGroup = isIncome
        ? await models.CategoryGroup.create({
            id: uuidv1(),
            isIncome: 1,
            name,
            tombstone: 0
          })
        : await models.CategoryGroup.create({
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
  }
};
