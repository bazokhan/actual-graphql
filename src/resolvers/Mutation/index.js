const UserMutation = require('./User.Mutation');
const AccountMutation = require('./Account.Mutation');
const PayeeMutation = require('./Payee.Mutation');
const GroupMutation = require('./Group.Mutation');
const CategoryMutation = require('./Category.Mutation');
const TransactionMutation = require('./Transaction.Mutation');
const InvoiceMutation = require('./Invoice.Mutation');
const ProductMutation = require('./Product.Mutation');
const ServiceMutation = require('./Service.Mutation');

module.exports = {
  ...UserMutation,
  ...AccountMutation,
  ...PayeeMutation,
  ...GroupMutation,
  ...CategoryMutation,
  ...TransactionMutation,
  ...InvoiceMutation,
  ...ProductMutation,
  ...ServiceMutation
};
