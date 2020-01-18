module.exports = {
  group: async category => category.getGroup({ where: { tombstone: 0 } }),
  transactions: async category =>
    category.getTransactions({ where: { tombstone: 0 } }),
  deleted: async category => Boolean(category.tombstone),
  count: async category =>
    category.countTransactions({ where: { tombstone: 0 } }),
  balance: async (category, _, { models }) => {
    return models.Transaction.sum('amount', {
      where: { categoryId: category.id, tombstone: 0 }
    });
  }
};
