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
  }
};
