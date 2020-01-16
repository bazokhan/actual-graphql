module.exports = {
  account: async transaction =>
    transaction.getAccount({ where: { tombstone: 0 } }),
  category: async transaction =>
    transaction.getCategory({ where: { tombstone: 0 } }),
  payee: async transaction => transaction.getPayee({ where: { tombstone: 0 } }),
  deleted: async transaction => Boolean(transaction.tombstone)
};
