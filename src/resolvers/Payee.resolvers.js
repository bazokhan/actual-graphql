module.exports = {
  // service: async payee => payee.getService(),
  account: async payee => {
    const transferAccount = await payee.getAccount();
    return transferAccount
      ? await payee.getAccount({ where: { tombstone: 0 } })
      : null;
  },
  transactions: async payee =>
    payee.getTransactions({ where: { tombstone: 0 } }),
  deleted: async payee => Boolean(payee.tombstone),
  count: async payee => payee.countTransactions({ where: { tombstone: 0 } }),
  balance: async (payee, _, { models }) => {
    return models.Transaction.sum('amount', {
      where: { payeeId: payee.id, tombstone: 0 }
    });
  }
};
