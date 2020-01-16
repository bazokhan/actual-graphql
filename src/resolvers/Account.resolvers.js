module.exports = {
  user: async account => account.getUser(),
  transactions: async account => account.getTransactions(),
  deleted: async account => Boolean(account.tombstone),
  count: async account => account.countTransactions(),
  balance: async (account, _, { models }) => {
    return models.Transaction.sum('amount', {
      where: { accountId: account.id }
    });
  }
};
