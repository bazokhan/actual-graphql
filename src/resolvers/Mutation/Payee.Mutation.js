const uuidv1 = require('uuid/v1');
module.exports = {
  createPayee: async (root, { payee: { accountId, name } }, { models }) =>
    accountId
      ? models.Payee.create({
          id: uuidv1(),
          transferAccount: accountId,
          name,
          tombstone: 0
        })
      : models.Payee.create({ id: uuidv1(), name, tombstone: 0 }),
  createPayees: async (root, { payees }, { models }) => {
    return payees.reduce(async (prev, { accountId, accountName, name }) => {
      prev = await prev;
      let accounts;
      if (accountId) {
        accounts = await models.Account.findAll({
          where: {
            id: accountId
          }
        });
        if (!accounts || !accounts.length) {
          return new Error("Couldn't find corresponding accounts by id");
        }
      } else if (accountName) {
        accounts = await models.Account.findAll({
          where: {
            name: accountName
          }
        });
        if (!accounts || !accounts.length) {
          return new Error("Couldn't find corresponding accounts by name");
        }
      }

      const createdPayee =
        accounts && accounts.length
          ? await models.Payee.create({
              id: uuidv1(),
              transferAccount: accounts[0].id,
              name,
              tombstone: 0
            })
          : await models.Payee.create({ id: uuidv1(), name, tombstone: 0 });
      if (createdPayee) {
        prev.push(createdPayee);
      }
      return prev;
    }, []);
  }
};
