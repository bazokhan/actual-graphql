module.exports = {
  users: async (root, args, { models }) => {
    return await models.User.findAll().filter(a => !a.tombstone);
  },
  // user: async (root, { id }, { models }) => {return await models.User.findById(id).filter(a=>!a.tombstone)},
  accounts: async (root, args, { models }) => {
    return await models.Account.findAll().filter(a => !a.tombstone);
  },
  // account: async (root, { id }, { models }) => {return await models.Account.findById(id.filter(a=>!a.tombstone)})
  payees: async (root, args, { models }) => {
    return await models.Payee.findAll().filter(a => !a.tombstone);
  },
  catGroups: async (root, args, { models }) => {
    return await models.CategoryGroup.findAll().filter(a => !a.tombstone);
  },
  categories: async (root, args, { models }) => {
    return await models.Category.findAll().filter(a => !a.tombstone);
  },
  transactions: async (root, args, { models }) => {
    return await models.Transaction.findAll().filter(a => !a.tombstone);
  },
  invoices: async (root, args, { models }) => {
    return await models.Invoice.findAll().filter(a => !a.tombstone);
  },
  products: async (root, args, { models }) => {
    return await models.Product.findAll().filter(a => !a.tombstone);
  }
};
