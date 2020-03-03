const { create, migrate, remove } = require('./middlewares');

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
    context
  ) => {
    try {
      const createdAccount = await migrate(
        'Account',
        { id, name, tombstone },
        context
      );
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

  deleteAccount: async (root, { id }, context) => {
    const validator = async account => {
      try {
        const hasTransactions = await account.countTransactions({
          where: { tombstone: 0 }
        });
        if (hasTransactions) {
          return new Error(
            "This account has transactions. It can't be deleted."
          );
        }
        return true;
      } catch (err) {
        console.log(err);
        return false;
      }
    };

    return remove('Account', id, context, validator);
  }
};
