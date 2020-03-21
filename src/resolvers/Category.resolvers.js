const {
  transactionResolvers,
  commonResolvers
} = require('./Query/middlewares');

module.exports = {
  // user: async account => account.getUser({ where: { tombstone: 0 } }),
  // service: async account => account.getService(),
  group: async category => category.getGroup({ where: { tombstone: 0 } }),
  ...transactionResolvers,
  ...commonResolvers
};
