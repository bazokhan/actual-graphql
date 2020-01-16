const uuidv1 = require('uuid/v1');

module.exports = {
  createAccount: async (root, { account: { userId, name } }, { models }) =>
    models.Account.create({ id: uuidv1(), userId, name, tombstone: 0 }),
  createAccounts: async (root, { accounts }, { models }) => {
    return accounts.reduce(async (prev, { userId, name }) => {
      prev = await prev;
      const createdAccount = await models.Account.create({
        id: uuidv1(),
        userId,
        name,
        tombstone: 0
      });
      if (createdAccount) {
        prev.push(createdAccount);
      }
      return prev;
    }, []);
  },
  deleteAccount: async (root, { id }, { models }) => {
    const targetAccount = await models.Account.findOne({ where: { id } });
    if (!targetAccount) return null;
    const hasTransactions = await targetAccount.countTransactions();
    if (hasTransactions)
      return new Error("This account has transactions. It can't be deleted.");
    return targetAccount.update({
      tombstone: 1
    });
  }
};
