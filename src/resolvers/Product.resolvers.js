module.exports = {
  service: async product => product.getService(),
  invoices: async product => product.getInvoices({ where: { tombstone: 0 } }),
  deleted: async product => Boolean(product.tombstone)
};
