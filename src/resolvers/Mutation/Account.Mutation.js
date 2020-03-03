const { create } = require('./middlewares');

module.exports = {
  createAccount: async (root, { account: { name } }, context) => {
    try {
      const { author } = context;
      const service = await author.getService();
      const accounts = await service.getAccounts({ where: { tombstone: 0 } });
      if (accounts && accounts.map(account => account.name).includes(name)) {
        return new Error('Already has an account with this name');
      }

      const createdAccount = await create('Account', { name }, context);
      await create(
        'Payee',
        { name, transferAccount: createdAccount.id },
        context
      );
      return createdAccount;
    } catch (err) {
      console.log(err);
      return null;
    }
  },

  // For migration purpose only
  migrateAccount: async (
    root,
    { account: { id, name, tombstone } },
    { models, author }
  ) => {
    if (!author || !author.id) return new Error('No author found!');
    models.Account.create({ id, name, tombstone });
  },

  deleteAccount: async (root, { id }, { models }) => {
    const targetAccount = await models.Account.findOne({ where: { id } });
    if (!targetAccount) return null;
    const hasTransactions = await targetAccount.countTransactions({
      where: { tombstone: 0 }
    });
    if (hasTransactions)
      return new Error("This account has transactions. It can't be deleted.");
    return targetAccount.update({
      tombstone: 1
    });
  }
};
