const { gql } = require('apollo-server');

const typeDefs = gql`
  scalar Token

  type User {
    id: ID!
    name: String!
    email: String!
    password: String!
    accounts: [Account!]!
    deleted: Boolean!
    createdAt: String!
    updatedAt: String!
  }

  input CreateUserInput {
    name: String!
    email: String!
    password: String!
  }

  type Account {
    id: ID!
    name: String!
    user: User!
    transactions: [Transaction!]!
    deleted: Boolean!
    createdAt: String!
    updatedAt: String!
    count: Int
    balance: Float
  }

  input CreateAccountInput {
    name: String!
    userId: ID!
  }

  type Payee {
    id: ID!
    name: String!
    account: Account
    transactions: [Transaction!]!
    deleted: Boolean!
    createdAt: String!
    updatedAt: String!
  }

  input CreatePayeeInput {
    name: String!
    accountId: ID
    accountName: String
  }

  type CategoryGroup {
    id: ID!
    name: String!
    isIncome: Boolean!
    categories: [Category!]!
    deleted: Boolean!
    createdAt: String!
    updatedAt: String!
  }

  input CreateCatGroupInput {
    name: String!
    isIncome: Boolean!
  }

  type Category {
    id: ID!
    name: String!
    isIncome: Boolean!
    group: CategoryGroup!
    transactions: [Transaction!]!
    deleted: Boolean!
    createdAt: String!
    updatedAt: String!
  }

  input CreateCategoryInput {
    name: String!
    groupId: ID
    groupName: String
  }

  type Transaction {
    id: ID!
    amount: Float!
    notes: String
    date: String!
    account: Account!
    category: Category!
    payee: Payee!
    deleted: Boolean!
    createdAt: String!
    updatedAt: String!
  }

  input CreateTransactionInput {
    amount: Float!
    notes: String
    date: String!
    accountId: ID
    categoryId: ID
    payeeId: ID
    accountName: String
    categoryName: String
    categoryGroupName: String
    payeeName: String
  }

  input LoginInput {
    name: String
    email: String
    password: String!
  }

  type Query {
    users: [User!]!
    accounts: [Account!]!
    payees: [Payee!]!
    catGroups: [CategoryGroup!]!
    categories: [Category!]!
    transactions: [Transaction!]!
  }

  type Mutation {
    login(credentials: LoginInput!): Token
    createUser(user: CreateUserInput!): User!
    createAccount(account: CreateAccountInput!): Account!
    createPayee(payee: CreatePayeeInput!): Payee!
    createCatGroup(group: CreateCatGroupInput!): CategoryGroup!
    createCategory(category: CreateCategoryInput!): Category!
    createTransaction(transaction: CreateTransactionInput!): Transaction!
    createAccounts(accounts: [CreateAccountInput!]!): [Account!]
    createPayees(payees: [CreatePayeeInput!]!): [Payee!]
    createCatGroups(groups: [CreateCatGroupInput!]!): [CategoryGroup!]
    createCategories(categories: [CreateCategoryInput!]!): [Category!]
    createTransactions(transactions: [CreateTransactionInput!]!): [Transaction]!
  }
`;

module.exports = typeDefs;
