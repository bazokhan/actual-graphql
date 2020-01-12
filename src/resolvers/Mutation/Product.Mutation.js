const uuidv1 = require('uuid/v1');

module.exports = {
  createProduct: async (
    root,
    { product: { name, invoicesIds } },
    { models }
  ) => {
    const product = await models.Product.create({
      id: uuidv1(),
      name,
      tombstone: 0
    });
    if (invoicesIds) {
      invoicesIds.reduce(async (prev, invoiceId) => {
        prev = await prev;
        await prev.addInvoice(invoiceId);
        return prev;
      }, product);
    }
    return product;
  }
};
