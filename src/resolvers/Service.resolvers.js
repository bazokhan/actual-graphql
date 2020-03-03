module.exports = {
  owner: async service => service.getOwner(),
  accounts: async service => service.getAccounts({ where: { tombstone: 0 } }),
  payees: async service => service.getPayees({ where: { tombstone: 0 } }),
  groups: async service => service.getGroups({ where: { tombstone: 0 } }),
  categories: async service =>
    service.getCategories({ where: { tombstone: 0 } }),
  transactions: async service =>
    service.getTransactions({ where: { tombstone: 0 } }),
  invoices: async service => service.getInvoices({ where: { tombstone: 0 } }),
  products: async service => service.getProducts({ where: { tombstone: 0 } })
};
