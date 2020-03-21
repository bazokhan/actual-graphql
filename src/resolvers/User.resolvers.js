const { commonResolvers } = require('./Query/middlewares');

module.exports = {
  service: async user => user.getService(),
  ...commonResolvers
};
