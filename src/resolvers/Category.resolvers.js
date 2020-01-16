module.exports = {
  group: async category => category.getCategoryGroup(),
  transactions: async category => category.getTransactions(),
  deleted: async category => Boolean(category.tombstone),
  balance: async (category, _, { models }) => {
    return models.Transaction.sum('amount', {
      where: { categoryId: category.id }
    });
  }
};
