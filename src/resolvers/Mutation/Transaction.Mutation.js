// const Op = require('sequelize').Op;
const { create, migrate, remove } = require('./middlewares');

module.exports = {
  createTransaction: async (
    root,
    { transaction: { amount, notes, date, accountId, categoryId, payeeId } },
    context
  ) => {
    try {
      const { author } = context;
      const service = await author.getOwner();
      const account = (
        await service.getAccounts({
          where: { id: accountId, tombstone: 0 }
        })
      )[0];
      if (!account) return new Error('No Account Found!');
      const category = (
        await service.getCategories({
          where: { id: categoryId, tombstone: 0 }
        })
      )[0];
      if (!category) return new Error('No Category Found!');
      const payee = (
        await service.getPayees({ where: { id: payeeId, tombstone: 0 } })
      )[0];
      if (!payee) return new Error('No Payee Found!');
      return create(
        'Transaction',
        {
          amount,
          notes,
          date,
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

  // For migration purpose only
  migrateTransaction: async (root, { transaction }, context) => {
    const {
      id,
      amount,
      notes,
      date,
      accountId,
      categoryId,
      payeeId,
      tombstone
    } = transaction;
    try {
      const { author, models } = context;
      const service = await author.getOwner();
      const alreadyExists = await models.Transaction.findByPk(id);
      if (alreadyExists) return new Error('Already existing!');
      const account = (
        await service.getAccounts({
          where: { id: accountId || 'noaccount' }
        })
      )[0];
      if (!account) return new Error('No Account Found!');
      const category = (
        await service.getCategories({
          where: { id: categoryId || 'nocategory' }
        })
      )[0];
      if (!category) return new Error('No Category Found!');
      const payee = (
        await service.getPayees({ where: { id: payeeId || 'nopayee' } })
      )[0];
      if (!payee) return new Error('No Payee Found!');
      return migrate(
        'Transaction',
        {
          id,
          amount,
          notes,
          date,
          accountId: account.id,
          categoryId: category.id,
          payeeId: payee.id,
          tombstone
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

  deleteTransaction: async (root, { id }, context) => {
    return remove('Transaction', id, context);
  }
};
