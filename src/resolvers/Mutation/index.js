const UserMutation = require('./User.Mutation');
const AccountMutation = require('./Account.Mutation');
const PayeeMutation = require('./Payee.Mutation');
const CategoryGroupMutation = require('./CategoryGroup.Mutation');
const CategoryMutation = require('./Category.Mutation');
const TransactionMutation = require('./Transaction.Mutation');

module.exports = {
  ...UserMutation,
  ...AccountMutation,
  ...PayeeMutation,
  ...CategoryGroupMutation,
  ...CategoryMutation,
  ...TransactionMutation
};
