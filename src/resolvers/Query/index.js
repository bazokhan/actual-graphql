module.exports = {
  users: async (root, { includeDeleted }, { models }) => {
    return includeDeleted
      ? await models.User.findAll()
      : await models.User.findAll({ where: { tombstone: 0 } });
  },
  // user: async (root, { id }, { models }) => {return await models.User.findById(id).filter(a=>!a.tombstone)},
  accounts: async (root, { includeDeleted }, { models }) => {
    return includeDeleted
      ? await models.Account.findAll()
      : await models.Account.findAll({ where: { tombstone: 0 } });
  },
  // account: async (root, { id }, { models }) => {return await models.Account.findById(id.filter(a=>!a.tombstone)})
  payees: async (root, { includeDeleted }, { models }) => {
    return includeDeleted
      ? await models.Payee.findAll()
      : await models.Payee.findAll({ where: { tombstone: 0 } });
  },
  groups: async (root, { includeDeleted }, { models }) => {
    return includeDeleted
      ? await models.Group.findAll()
      : await models.Group.findAll({ where: { tombstone: 0 } });
  },
  categories: async (root, { includeDeleted }, { models }) => {
    return includeDeleted
      ? await models.Category.findAll()
      : await models.Category.findAll({ where: { tombstone: 0 } });
  },
  transactions: async (root, { includeDeleted }, { models }) => {
    return includeDeleted
      ? await models.Transaction.findAll()
      : await models.Transaction.findAll({ where: { tombstone: 0 } });
  },
  invoices: async (root, { includeDeleted }, { models }) => {
    return includeDeleted
      ? await models.Invoice.findAll()
      : await models.Invoice.findAll({ where: { tombstone: 0 } });
  },
  products: async (root, { includeDeleted }, { models }) => {
    return includeDeleted
      ? await models.Product.findAll()
      : await models.Product.findAll({ where: { tombstone: 0 } });
  }
};
