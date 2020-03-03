const { create, migrate } = require('./middlewares');

module.exports = {
  createPayee: async (root, { payee: { accountId, name } }, context) => {
    try {
      const { author, models } = context;
      if (accountId) {
        const linkedAccount = await models.Account.findByPk(accountId);
        if (!linkedAccount)
          return new Error('No Account Found To Be Linked To This Payee');
      }
      const service = await author.getService();
      const payees = await service.getPayees({ where: { tombstone: 0 } });
      if (payees && payees.map(payee => payee.name).includes(name)) {
        return new Error('Already has a payee with this name');
      }
      return create(
        'Payee',
        { name, transferAccount: accountId || null },
        context
      );
    } catch (err) {
      console.log(err);
      return null;
    }
  },

  // For migration purpose only
  migratePayee: async (
    root,
    { payee: { id, accountId, name, tombstone } },
    context
  ) => {
    try {
      const { models } = context;
      if (accountId) {
        const linkedAccount = await models.Account.findByPk(accountId);
        if (!linkedAccount)
          return new Error('No Account Found To Be Linked To This Payee');
      }
      return migrate(
        'Payee',
        { id, name, transferAccount: accountId || null, tombstone },
        context
      );
    } catch (err) {
      console.log(err);
      return null;
    }
  },

  deletePayee: async (root, { id }, { models }) => {
    const targetPayee = await models.Payee.findOne({ where: { id } });
    if (!targetPayee) return null;
    if (await targetPayee.getAccount({ where: { tombstone: 0 } }))
      return new Error(
        'This payee is connected to an account. Please delete the account first'
      );
    const hasTransactions = await targetPayee.countTransactions({
      where: { tombstone: 0 }
    });
    if (hasTransactions)
      return new Error("This payee has transactions. It can't be deleted.");
    return targetPayee.update({
      tombstone: 1
    });
  }
};
