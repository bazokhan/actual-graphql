const uuidv1 = require('uuid/v1');

module.exports = {
  createAccount: async (root, { account: { userId, name } }, { models }) =>
    models.Account.create({ id: uuidv1(), userId, name, tombstone: 0 }),
  // For migration purpose only
  createAccounts: async (root, { accounts }, { models, author }) => {
    if (!author || !author.id) return new Error('No author found!');
    return accounts.reduce(async (prev, { name, tombstone }) => {
      prev = await prev;
      const createdAccount = await models.Account.create({
        id: uuidv1(),
        userId: author.id,
        name,
        tombstone
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
