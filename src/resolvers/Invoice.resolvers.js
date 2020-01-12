module.exports = {
  products: async invoice => invoice.getProducts(),
  transactions: async invoice => invoice.getTransactions(),
  deleted: async invoice => Boolean(invoice.tombstone)
};
