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
    count: Int
    balance: Float
  }

  input CreatePayeeInput {
    name: String!
    accountId: ID
    accountName: String
  }

  type Group {
    id: ID!
    name: String!
    isIncome: Boolean!
    categories: [Category!]!
    deleted: Boolean!
    createdAt: String!
    updatedAt: String!
    count: Int
    balance: Float
  }

  input CreateGroupInput {
    name: String!
    isIncome: Boolean!
  }

  type Category {
    id: ID!
    name: String!
    isIncome: Boolean!
    group: Group!
    transactions: [Transaction!]!
    deleted: Boolean!
    createdAt: String!
    updatedAt: String!
    count: Int
    balance: Float
  }

  input CreateCategoryInput {
    name: String!
    groupId: ID
    groupName: String
  }

  input UpdateCategoryInput {
    name: String
    groupId: ID
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
    groupName: String
    payeeName: String
  }

  input UpdateTransactionInput {
    amount: Float
    notes: String
    date: String
    accountId: ID
    categoryId: ID
    payeeId: ID
    deleted: Boolean
  }

  type Invoice {
    id: ID!
    amountDue: Float!
    dateDue: String
    deleted: Boolean!
    transactions: [Transaction]
    products: [Product]
    createdAt: String!
    updatedAt: String!
  }

  input CreateInvoiceInput {
    amountDue: Float!
    dateDue: String
    transactionsIds: [ID]
    productsIds: [ID]
  }

  type Product {
    id: ID!
    name: String!
    deleted: Boolean!
    invoices: [Invoice]
    createdAt: String!
    updatedAt: String!
  }

  input CreateProductInput {
    name: String!
    invoicesIds: [ID]
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
    groups: [Group!]!
    categories: [Category!]!
    transactions: [Transaction!]!
    invoices: [Invoice!]!
    products: [Product!]!
  }

  type Mutation {
    login(credentials: LoginInput!): Token
    createUser(user: CreateUserInput!): User!
    createAccount(account: CreateAccountInput!): Account!
    createPayee(payee: CreatePayeeInput!): Payee!
    createGroup(group: CreateGroupInput!): Group!
    createCategory(category: CreateCategoryInput!): Category!
    createTransaction(transaction: CreateTransactionInput!): Transaction!
    updateTransaction(
      id: ID!
      transaction: UpdateTransactionInput
    ): Transaction!
    createInvoice(invoice: CreateInvoiceInput): Invoice!
    createProduct(product: CreateProductInput): Product!
    createAccounts(accounts: [CreateAccountInput!]!): [Account!]
    createPayees(payees: [CreatePayeeInput!]!): [Payee!]
    createGroups(groups: [CreateGroupInput!]!): [Group!]
    createCategories(categories: [CreateCategoryInput!]!): [Category!]
    createTransactions(transactions: [CreateTransactionInput!]!): [Transaction]!
    deleteAccount(id: ID!): Account
    deleteCategory(id: ID!): Category
    deleteGroup(id: ID!): Group
    deletePayee(id: ID!): Payee
    updateCategory(id: ID!, category: UpdateCategoryInput): Category!
  }
`;

module.exports = typeDefs;
