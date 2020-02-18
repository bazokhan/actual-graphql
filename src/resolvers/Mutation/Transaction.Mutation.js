const uuidv1 = require('uuid/v1');
const Op = require('sequelize').Op;
const { numerizeDate } = require('./helpers');

module.exports = {
  createTransaction: async (
    root,
    { transaction: { amount, notes, date, accountId, categoryId, payeeId } },
    { models }
  ) =>
    models.Transaction.create({
      id: uuidv1(),
      amount,
      notes,
      date: numerizeDate(date),
      accountId,
      categoryId,
      payeeId,
      tombstone: 0
    }),
  updateTransaction: async (root, { id, transaction }, { models }) => {
    let target;
    try {
      target = await models.Transaction.findByPk(id);
      Object.keys(transaction).reduce(async (prev, key) => {
        prev = await prev;
        await prev.update({ [key]: transaction[key] });
        return prev;
      }, target);
    } catch (ex) {
      console.log(ex);
    }
    return target;
  },
  deleteTransaction: async (root, { id }, { models }) => {
    let target;
    try {
      target = await models.Transaction.findByPk(id);
      await target.update({ tombstone: 1 });
    } catch (ex) {
      console.log(ex);
    }
    return target;
  },
  // For migration purpose only
  createTransactions: async (root, { transactions }, { models }) => {
    return transactions.reduce(
      async (
        prev,
        {
          amount,
          notes,
          date,
          accountId,
          accountName,
          categoryId,
          categoryName,
          groupName,
          payeeId,
          payeeName,
          tombstone
        }
      ) => {
        prev = await prev;
        let accounts;
        let categories;
        let payees;
        if (accountId && categoryId && payeeId) {
          accounts = await models.Account.findAll({
            where: {
              id: accountId
            }
          });
          categories = await models.Category.findAll({
            where: {
              id: categoryId
            }
          });
          payees = await models.Payee.findAll({
            where: {
              id: payeeId
            }
          });
        } else if (accountName && categoryName && groupName && payeeName) {
          accounts = await models.Account.findAll({
            where: {
              name: accountName
            }
          });
          if (!accounts)
            return new Error("Couldn't find corresponding ACCOUNT");
          const groups = await models.Group.findAll({
            where: {
              name: groupName
            }
          });
          if (!groups) return new Error("Couldn't find corresponding GROUP");
          categories = await models.Category.findAll({
            where: {
              [Op.and]: [{ name: categoryName }, { groupId: groups[0].id }]
            }
          });
          if (!categories)
            return new Error("Couldn't find corresponding CATEGORY");
          payees = await models.Payee.findAll({
            where: {
              name: payeeName
            }
          });
          if (!payees) return new Error("Couldn't find corresponding PAYEE");
        }
        try {
          const createdTransaction = await models.Transaction.create({
            id: uuidv1(),
            amount,
            notes,
            date,
            accountId: accounts[0].id,
            categoryId: categories[0].id,
            payeeId: payees[0].id,
            tombstone
          });

          if (createdTransaction) {
            prev.push(createdTransaction);
          }
        } catch (e) {
          console.log(e);
        }
        return prev;
      },
      []
    );
  }
};
