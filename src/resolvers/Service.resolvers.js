module.exports = {
  owner: async service => service.getOwner(),
  members: async service => service.getUsers(),
  accounts: async (service, _, { models }) => {
    return models.Account.findAll({
      where: { serviceId: service.id }
    });
  },
  payees: async (service, _, { models }) => {
    return models.Payee.findAll({
      where: { serviceId: service.id }
    });
  },
  groups: async (service, _, { models }) => {
    return models.Group.findAll({
      where: { serviceId: service.id }
    });
  },
  categories: async (service, _, { models }) => {
    return models.Category.findAll({
      where: { serviceId: service.id }
    });
  },
  transactions: async (service, _, { models }) => {
    return models.Transaction.findAll({
      where: { serviceId: service.id }
    });
  },
  invoices: async (service, _, { models }) => {
    return models.Invoice.findAll({
      where: { serviceId: service.id }
    });
  },
  products: async (service, _, { models }) => {
    return models.Product.findAll({
      where: { serviceId: service.id }
    });
  }
};
