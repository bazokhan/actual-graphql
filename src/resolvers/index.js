const { Token } = require('./scalars');
const Query = require('./Query');
const Mutation = require('./Mutation');
const User = require('./User.resolvers');
const Account = require('./Account.resolvers');
const Payee = require('./Payee.resolvers');
const Group = require('./Group.resolvers');
const Category = require('./Category.resolvers');
const Transaction = require('./Transaction.resolvers');
const Invoice = require('./Invoice.resolvers');
const Product = require('./Product.resolvers');

const resolvers = {
  Token,
  Query,
  Mutation,
  User,
  Account,
  Payee,
  Group,
  Category,
  Transaction,
  Invoice,
  Product
};

module.exports = resolvers;
