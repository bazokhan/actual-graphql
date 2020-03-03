const {
  transactionResolvers,
  commonResolvers
} = require('./Query/middlewares');

module.exports = {
  account: async payee => {
    return payee.getAccount({ where: { tombstone: 0 } });
  },
  // user: async account => account.getUser({ where: { tombstone: 0 } }),
  // service: async account => account.getService(),
  ...transactionResolvers,
  ...commonResolvers
};
