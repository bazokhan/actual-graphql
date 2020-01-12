module.exports = {
  invoices: async product => product.getInvoices(),
  deleted: async product => Boolean(product.tombstone)
};
