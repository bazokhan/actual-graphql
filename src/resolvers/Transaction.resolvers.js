module.exports = {
  account: async transaction => transaction.getAccount(),
  category: async transaction => transaction.getCategory(),
  payee: async transaction => transaction.getPayee(),
  deleted: async transaction => Boolean(transaction.tombstone)
};
