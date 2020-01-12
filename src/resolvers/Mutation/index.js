const UserMutation = require('./User.Mutation');
const AccountMutation = require('./Account.Mutation');
const PayeeMutation = require('./Payee.Mutation');
const CategoryGroupMutation = require('./CategoryGroup.Mutation');
const CategoryMutation = require('./Category.Mutation');
const TransactionMutation = require('./Transaction.Mutation');
const InvoiceMutation = require('./Invoice.Mutation');
const ProductMutation = require('./Product.Mutation');

module.exports = {
  ...UserMutation,
  ...AccountMutation,
  ...PayeeMutation,
  ...CategoryGroupMutation,
  ...CategoryMutation,
  ...TransactionMutation,
  ...InvoiceMutation,
  ...ProductMutation
};
