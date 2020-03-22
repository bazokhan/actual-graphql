const { create } = require('./middlewares');

module.exports = {
  createProduct: async (root, { product: { name, invoicesIds } }, context) => {
    try {
      const { author } = context;
      const service = await author.getOwner();
      const products = await service.getProducts({ where: { tombstone: 0 } });
      if (products && products.map(product => product.name).includes(name)) {
        return new Error('Already has a product with this name');
      }
      const product = await create('Product', { name }, context);
      if (invoicesIds) {
        invoicesIds.reduce(async (prev, invoiceId) => {
          prev = await prev;
          await prev.addInvoice(invoiceId);
          return prev;
        }, product);
      }
      return product;
    } catch (err) {
      console.log(err);
      return null;
    }
  }
};
