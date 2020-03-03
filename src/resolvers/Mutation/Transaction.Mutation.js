const uuidv1 = require('uuid/v1');
const Op = require('sequelize').Op;
const { numerizeDate } = require('./helpers');
const { create } = require('./middlewares');

module.exports = {
  createTransaction: async (
    root,
    { transaction: { amount, notes, date, accountId, categoryId, payeeId } },
    context
  ) => {
    try {
      const { author } = context;
      const service = await author.getService();
      const account = (
        await service.getAccounts({
          where: { id: accountId }
        })
      )[0];
      if (!account) return new Error('No Account Found!');
      const category = (
        await service.getCategories({
          where: { id: categoryId }
        })
      )[0];
      if (!category) return new Error('No Category Found!');
      const payee = (await service.getPayees({ where: { id: payeeId } }))[0];
      if (!payee) return new Error('No Payee Found!');
      return create(
        'Transaction',
        {
          amount,
          notes,
          date: numerizeDate(date),
          accountId: account.id,
          categoryId: category.id,
          payeeId: payee.id
        },
        context
      );
    } catch (err) {
      console.log(err);
      return null;
    }
  },

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
  },

  // For migration purpose only
  migrateTransactions: async (root, { transactions }, { models }) => {
    return transactions.reduce(
      async (
        prev,
        {
          id,
          amount,
          notes,
          date,
          accountName,
          categoryName,
          groupName,
          payeeName,
          tombstone
        }
      ) => {
        prev = await prev;
        const alreadyExists = await models.Transaction.findByPk(id);
        if (alreadyExists) return prev;
        const accounts = await models.Account.findAll({
          where: {
            name: accountName
          }
        });
        if (!accounts) return new Error("Couldn't find corresponding ACCOUNT");
        const groups = await models.Group.findAll({
          where: {
            name: groupName
          }
        });
        if (!groups) return new Error("Couldn't find corresponding GROUP");
        const categories = await models.Category.findAll({
          where: {
            [Op.and]: [{ name: categoryName }, { groupId: groups[0].id }]
          }
        });
        if (!categories)
          return new Error("Couldn't find corresponding CATEGORY");
        const payees = await models.Payee.findAll({
          where: {
            name: payeeName
          }
        });
        if (!payees) return new Error("Couldn't find corresponding PAYEE");
        try {
          const createdTransaction = await models.Transaction.create({
            id,
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
