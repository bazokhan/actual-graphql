const uuidv1 = require('uuid/v1');

module.exports = {
  createInvoice: async (
    root,
    { invoice: { amountDue, dateDue, transactionsIds, productsIds } },
    { models }
  ) => {
    const id = uuidv1();
    const invoice = await models.Invoice.create({
      id,
      amountDue,
      dateDue,
      transactionsIds: transactionsIds || [],
      tombstone: 0
    });
    if (transactionsIds) {
      transactionsIds.reduce(async (prev, transactionId) => {
        prev = await prev;
        const transaction = await models.Transaction.findOne({
          where: { id: transactionId }
        });
        transaction.update({ invoiceId: id });
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
  }
};
