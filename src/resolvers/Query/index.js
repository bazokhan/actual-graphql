module.exports = {
  users: async (root, args, { models }) => {
    return await models.User.findAll({ where: { tombstone: 0 } });
  },
  // user: async (root, { id }, { models }) => {return await models.User.findById(id).filter(a=>!a.tombstone)},
  accounts: async (root, args, { models }) => {
    return await models.Account.findAll({ where: { tombstone: 0 } });
  },
  // account: async (root, { id }, { models }) => {return await models.Account.findById(id.filter(a=>!a.tombstone)})
  payees: async (root, args, { models }) => {
    return await models.Payee.findAll({ where: { tombstone: 0 } });
  },
  groups: async (root, args, { models }) => {
    return await models.Group.findAll({ where: { tombstone: 0 } });
  },
  categories: async (root, args, { models }) => {
    return await models.Category.findAll({ where: { tombstone: 0 } });
  },
  transactions: async (root, args, { models }) => {
    return await models.Transaction.findAll({ where: { tombstone: 0 } });
  },
  invoices: async (root, args, { models }) => {
    return await models.Invoice.findAll({ where: { tombstone: 0 } });
  },
  products: async (root, args, { models }) => {
    return await models.Product.findAll({ where: { tombstone: 0 } });
  }
};
