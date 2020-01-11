module.exports = {
  group: async category => category.getCategoryGroup(),
  transactions: async category => category.getTransactions(),
  deleted: async category => Boolean(category.tombstone)
};
