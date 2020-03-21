const {
  transactionResolvers,
  commonResolvers
} = require('./Query/middlewares');

module.exports = {
  // service: async invoice => invoice.getService(),
  products: async invoice => invoice.getProducts({ where: { tombstone: 0 } }),
  ...transactionResolvers,
  ...commonResolvers
};
