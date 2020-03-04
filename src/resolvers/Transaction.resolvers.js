const { commonResolvers } = require('./Query/middlewares');

module.exports = {
  // service: async transaction => transaction.getService(),
  account: async transaction =>
    transaction.getAccount({ where: { tombstone: 0 } }),
  category: async transaction =>
    transaction.getCategory({ where: { tombstone: 0 } }),
  invoice: async transaction =>
    transaction.getInvoice({ where: { tombstone: 0 } }),
  payee: async transaction => transaction.getPayee({ where: { tombstone: 0 } }),
  ...commonResolvers
};
