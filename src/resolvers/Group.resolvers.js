module.exports = {
  service: async group => group.getService(),
  categories: async group => group.getCategories({ where: { tombstone: 0 } }),
  deleted: async group => Boolean(group.tombstone),
  count: async group => {
    const groups = await group.getCategories({ where: { tombstone: 0 } });
    return groups
      ? groups.reduce(async (prev, next) => {
          prev = await prev;
          const categoryTransactions = next.countTransactions
            ? await next.countTransactions({ where: { tombstone: 0 } })
            : 0;
          return prev + categoryTransactions;
        }, 0)
      : 0;
  },
  balance: async (group, _, { models }) => {
    const groups = await group.getCategories({ where: { tombstone: 0 } });
    return groups
      ? groups.reduce(async (prev, next) => {
          prev = await prev;
          const categorySum =
            (await models.Transaction.sum('amount', {
              where: { categoryId: next.id, tombstone: 0 }
            })) || 0;
          return prev + categorySum;
        }, 0)
      : 0;
  }
};
