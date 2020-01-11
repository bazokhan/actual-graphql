module.exports = {
  users: async (root, args, { models }) => models.User.findAll(),
  // user: async (root, { id }, { models }) => models.User.findById(id),
  accounts: async (root, args, { models }) => models.Account.findAll(),
  // account: async (root, { id }, { models }) => models.Account.findById(id)
  payees: async (root, args, { models }) => models.Payee.findAll(),
  catGroups: async (root, args, { models }) => models.CategoryGroup.findAll(),
  categories: async (root, args, { models }) => models.Category.findAll(),
  transactions: async (root, args, { models }) => models.Transaction.findAll()
};
