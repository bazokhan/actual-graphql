const { authenticate, moderate, contribute } = require('./middlewares');

module.exports = {
  // Global queries
  services: async (root, args, context) => {
    const { models } = context;
    return moderate(context, async () => models.Service.findAll());
  },
  users: async (root, { includeDeleted }, context) => {
    const { models } = context;
    return moderate(context, async () =>
      includeDeleted
        ? models.User.findAll()
        : models.User.findAll({ where: { tombstone: 0 } })
    );
  },

  // Service scope queries
  accounts: async (root, { includeDeleted }, context) => {
    const queryFunction = async service =>
      includeDeleted
        ? service.getAccounts()
        : service.getAccounts({ where: { tombstone: 0 } });
    return authenticate(context, queryFunction);
  },
  groups: async (root, { includeDeleted }, context) => {
    const queryFunction = async service =>
      includeDeleted
        ? service.getGroups()
        : service.getGroups({ where: { tombstone: 0 } });
    return authenticate(context, queryFunction);
  },
  payees: async (root, { includeDeleted }, context) => {
    const queryFunction = async service =>
      includeDeleted
        ? service.getPayees()
        : service.getPayees({ where: { tombstone: 0 } });
    return authenticate(context, queryFunction);
  },
  categories: async (root, { includeDeleted }, context) => {
    const queryFunction = async service =>
      includeDeleted
        ? service.getCategories()
        : service.getCategories({ where: { tombstone: 0 } });
    return authenticate(context, queryFunction);
  },
  transactions: async (root, { includeDeleted }, context) => {
    const queryFunction = async service =>
      includeDeleted
        ? service.getTransactions()
        : service.getTransactions({ where: { tombstone: 0 } });
    return authenticate(context, queryFunction);
  },
  invoices: async (root, { includeDeleted }, context) => {
    const queryFunction = async service =>
      includeDeleted
        ? service.getInvoices()
        : service.getInvoices({ where: { tombstone: 0 } });
    return authenticate(context, queryFunction);
  },
  products: async (root, { includeDeleted }, context) => {
    const queryFunction = async service =>
      includeDeleted
        ? service.getProducts()
        : service.getProducts({ where: { tombstone: 0 } });
    return authenticate(context, queryFunction);
  },

  // Contributor scope queries
  publicUserProfiles: async (root, args, context) => {
    const { models } = context;
    return authenticate(context, async () =>
      models.User.findAll({ where: { tombstone: 0 } })
    );
  },
  contributorServices: async (root, args, context) => {
    const { author } = context;
    const queryFunction = async () => author.getServices();
    return authenticate(context, queryFunction);
  },
  contributorAccounts: async (root, { includeDeleted, serviceId }, context) => {
    const queryFunction = async service =>
      includeDeleted
        ? service.getAccounts()
        : service.getAccounts({ where: { tombstone: 0 } });
    return contribute(serviceId, context, queryFunction);
  },
  contributorGroups: async (root, { includeDeleted, serviceId }, context) => {
    const queryFunction = async service =>
      includeDeleted
        ? service.getGroups()
        : service.getGroups({ where: { tombstone: 0 } });
    return contribute(serviceId, context, queryFunction);
  },
  contributorPayees: async (root, { includeDeleted, serviceId }, context) => {
    const queryFunction = async service =>
      includeDeleted
        ? service.getPayees()
        : service.getPayees({ where: { tombstone: 0 } });
    return contribute(serviceId, context, queryFunction);
  },
  contributorCategories: async (
    root,
    { includeDeleted, serviceId },
    context
  ) => {
    const queryFunction = async service =>
      includeDeleted
        ? service.getCategories()
        : service.getCategories({ where: { tombstone: 0 } });
    return contribute(serviceId, context, queryFunction);
  },
  contributorTransactions: async (
    root,
    { includeDeleted, serviceId },
    context
  ) => {
    const queryFunction = async service =>
      includeDeleted
        ? service.getTransactions()
        : service.getTransactions({ where: { tombstone: 0 } });
    return contribute(serviceId, context, queryFunction);
  },
  contributorInvoices: async (root, { includeDeleted, serviceId }, context) => {
    const queryFunction = async service =>
      includeDeleted
        ? service.getInvoices()
        : service.getInvoices({ where: { tombstone: 0 } });
    return contribute(serviceId, context, queryFunction);
  },
  contributorProducts: async (root, { includeDeleted, serviceId }, context) => {
    const queryFunction = async service =>
      includeDeleted
        ? service.getProducts()
        : service.getProducts({ where: { tombstone: 0 } });
    return contribute(serviceId, context, queryFunction);
  }
};
