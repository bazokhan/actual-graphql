module.exports = {
  // user: async account => account.getUser({ where: { tombstone: 0 } }),
  service: async account => account.getService(),
  transactions: async account =>
    account.getTransactions({ where: { tombstone: 0 } }),
  deleted: async account => Boolean(account.tombstone),
  count: async account =>
    account.countTransactions({ where: { tombstone: 0 } }),
  balance: async (account, _, { models }) => {
    return models.Transaction.sum('amount', {
      where: { accountId: account.id, tombstone: 0 }
    });
  }
};
