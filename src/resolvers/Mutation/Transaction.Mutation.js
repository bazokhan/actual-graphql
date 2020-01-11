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
      acct: accountId,
      category: categoryId,
      payeeId,
      tombstone: 0
    }),
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
          categoryGroupName,
          payeeId,
          payeeName
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
        } else if (
          accountName &&
          categoryName &&
          categoryGroupName &&
          payeeName
        ) {
          accounts = await models.Account.findAll({
            where: {
              name: accountName
            }
          });
          if (!accounts)
            return new Error("Couldn't find corresponding ACCOUNT");
          const categoryGroups = await models.CategoryGroup.findAll({
            where: {
              name: categoryGroupName
            }
          });
          if (!categoryGroups)
            return new Error("Couldn't find corresponding GROUP");
          categories = await models.Category.findAll({
            where: {
              [Op.and]: [
                { name: categoryName },
                { catGroup: categoryGroups[0].id }
              ]
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
            acct: accounts[0].id,
            category: categories[0].id,
            payeeId: payees[0].id,
            tombstone: 0
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
