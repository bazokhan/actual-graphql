const { Token } = require('./scalars');
const Query = require('./Query');
const Mutation = require('./Mutation');
const User = require('./User.resolvers');
const Account = require('./Account.resolvers');
const Payee = require('./Payee.resolvers');
const CategoryGroup = require('./CategoryGroup.resolvers');
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
  CategoryGroup,
  Category,
  Transaction,
  Invoice,
  Product
};

module.exports = resolvers;
