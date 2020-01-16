module.exports = {
  invoices: async product => product.getInvoices({ where: { tombstone: 0 } }),
  deleted: async product => Boolean(product.tombstone)
};
