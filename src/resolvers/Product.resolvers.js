const { commonResolvers } = require('./Query/middlewares');

module.exports = {
  // service: async product => product.getService(),
  invoices: async product => product.getInvoices({ where: { tombstone: 0 } }),
  ...commonResolvers
};
