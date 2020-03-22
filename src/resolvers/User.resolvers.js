const { commonResolvers } = require('./Query/middlewares');

module.exports = {
  service: async user => user.getOwner(),
  services: async user => user.getServices(),
  ...commonResolvers
};
