const { create } = require('./middlewares');

module.exports = {
  createInvoice: async (
    root,
    { invoice: { amountDue, dateDue, transactionsIds, productsIds } },
    context
  ) => {
    try {
      const invoice = await create(
        'Invoice',
        { amountDue, dateDue, productsIds },
        context
      );
      if (transactionsIds) {
        const { models } = context;
        transactionsIds.reduce(async (prev, transactionId) => {
          prev = await prev;
          const transaction = await models.Transaction.findOne({
            where: { id: transactionId }
          });
          if (transaction) {
            await transaction.update({ invoiceId: invoice.id });
          }
          return prev;
        }, {});
      }
      if (productsIds) {
        productsIds.reduce(async (prev, productId) => {
          prev = await prev;
          await prev.addProduct(productId);
          return prev;
        }, invoice);
      }
      return invoice;
    } catch (err) {
      console.log(err);
      return null;
    }
  }
};
