module.exports = {
  service: async invoice => invoice.getService(),
  products: async invoice => invoice.getProducts({ where: { tombstone: 0 } }),
  transactions: async invoice =>
    invoice.getTransactions({ where: { tombstone: 0 } }),
  deleted: async invoice => Boolean(invoice.tombstone)
};
