const { gql } = require('apollo-server');
const { print: addSchema } = require('graphql/language/printer');

const User = gql`
  enum UserRoles {
    SUPERADMIN
    USER
  }

  type User {
    id: ID!
    name: String!
    role: UserRoles!
    email: String!
    password: String!
    deleted: Boolean!
    createdAt: String!
    updatedAt: String!
    service: Service!
    services: [Service]
  }

  input CreateUserInput {
    name: String!
    role: UserRoles!
    email: String!
    password: String!
  }
`;

const Account = gql`
  type Account {
    id: ID!
    name: String!
    transactions: [Transaction!]!
    count: Int
    balance: Float
    deleted: Boolean!
    createdAt: String!
    updatedAt: String!
  }

  input CreateAccountInput {
    name: String!
  }

  input MigrateAccountInput {
    id: ID!
    name: String!
    tombstone: Int
  }
`;

const Category = gql`
  type Category {
    id: ID!
    name: String!
    isIncome: Boolean!
    transactions: [Transaction!]!
    count: Int
    balance: Float
    deleted: Boolean!
    createdAt: String!
    updatedAt: String!
    group: Group!
  }

  input CreateCategoryInput {
    name: String!
    groupId: ID!
  }

  input MigrateCategoryInput {
    id: ID!
    name: String!
    groupId: ID!
    tombstone: Int
  }

  input UpdateCategoryInput {
    name: String
    groupId: ID
  }
`;

const Payee = gql`
  type Payee {
    id: ID!
    name: String!
    account: Account
    transactions: [Transaction!]!
    count: Int
    balance: Float
    deleted: Boolean!
    createdAt: String!
    updatedAt: String!
  }

  input CreatePayeeInput {
    name: String!
    accountId: ID
  }

  input MigratePayeeInput {
    id: ID!
    name: String!
    accountId: ID
    tombstone: Int
  }
`;

const Group = gql`
  type Group {
    id: ID!
    name: String!
    isIncome: Boolean!
    categories: [Category!]!
    count: Int
    balance: Float
    deleted: Boolean!
    createdAt: String!
    updatedAt: String!
  }

  input CreateGroupInput {
    name: String!
    isIncome: Boolean!
  }

  input MigrateGroupInput {
    id: ID!
    name: String!
    isIncome: Boolean!
    tombstone: Int
  }
`;

const Transaction = gql`
  type Transaction {
    id: ID!
    amount: Float!
    notes: String
    date: Int!
    deleted: Boolean!
    createdAt: String!
    updatedAt: String!
    account: Account!
    category: Category!
    payee: Payee!
    invoice: Invoice
  }

  input CreateTransactionInput {
    amount: Float!
    notes: String
    date: Int!
    accountId: ID
    categoryId: ID
    payeeId: ID
  }

  input UpdateTransactionInput {
    amount: Float
    notes: String
    date: Int
    accountId: ID
    categoryId: ID
    payeeId: ID
    deleted: Boolean
  }

  input MigrateTransactionInput {
    id: ID
    amount: Float!
    notes: String
    date: Int!
    accountId: ID
    categoryId: ID
    payeeId: ID
    tombstone: Int
  }
`;

const Invoice = gql`
  type Invoice {
    id: ID!
    amountDue: Float!
    dateDue: String
    transactions: [Transaction]
    products: [Product]
    count: Int
    balance: Float
    deleted: Boolean!
    createdAt: String!
    updatedAt: String!
  }

  input CreateInvoiceInput {
    amountDue: Float!
    dateDue: String
    transactionsIds: [ID]
    productsIds: [ID]
  }
`;

const Product = gql`
  type Product {
    id: ID!
    name: String!
    invoices: [Invoice]
    deleted: Boolean!
    createdAt: String!
    updatedAt: String!
  }

  input CreateProductInput {
    name: String!
    invoicesIds: [ID]
  }
`;

const Service = gql`
  type Service {
    id: ID!
    owner: User!
    accounts: [Account]
    payees: [Payee]
    groups: [Group]
    categories: [Category]
    transactions: [Transaction]
    invoices: [Invoice]
    products: [Product]
    createdAt: String!
    updatedAt: String!
    contributors: [User]
  }
`;

const typeDefs = gql`
  scalar Token

  ${addSchema(User)}
  ${addSchema(Account)}
  ${addSchema(Payee)}
  ${addSchema(Group)}
  ${addSchema(Category)}
  ${addSchema(Transaction)}
  ${addSchema(Invoice)}
  ${addSchema(Product)}
  ${addSchema(Service)}

  input LoginInput {
    name: String
    email: String
    password: String!
  }

  type Query {
    services: [Service!]!
    users(includeDeleted: Boolean, onlyDeleted: Boolean): [User!]!

    accounts(includeDeleted: Boolean, onlyDeleted: Boolean): [Account!]!
    categories(includeDeleted: Boolean, onlyDeleted: Boolean): [Category!]!
    groups(includeDeleted: Boolean, onlyDeleted: Boolean): [Group!]!
    invoices(includeDeleted: Boolean, onlyDeleted: Boolean): [Invoice!]!
    payees(includeDeleted: Boolean, onlyDeleted: Boolean): [Payee!]!
    products(includeDeleted: Boolean, onlyDeleted: Boolean): [Product!]!
    transactions(includeDeleted: Boolean, onlyDeleted: Boolean): [Transaction!]!

    publicUserProfiles: [User]
    contributorServices: [Service]
    contributorAccounts(
      includeDeleted: Boolean
      onlyDeleted: Boolean
      serviceId: ID!
    ): [Account!]!
    contributorCategories(
      includeDeleted: Boolean
      onlyDeleted: Boolean
      serviceId: ID!
    ): [Category!]!
    contributorGroups(
      includeDeleted: Boolean
      onlyDeleted: Boolean
      serviceId: ID!
    ): [Group!]!
    contributorInvoices(
      includeDeleted: Boolean
      onlyDeleted: Boolean
      serviceId: ID!
    ): [Invoice!]!
    contributorPayees(
      includeDeleted: Boolean
      onlyDeleted: Boolean
      serviceId: ID!
    ): [Payee!]!
    contributorProducts(
      includeDeleted: Boolean
      onlyDeleted: Boolean
      serviceId: ID!
    ): [Product!]!
    contributorTransactions(
      includeDeleted: Boolean
      onlyDeleted: Boolean
      serviceId: ID!
    ): [Transaction!]!
  }

  type Mutation {
    login(credentials: LoginInput!): Token
    createUser(user: CreateUserInput!): User

    createAccount(account: CreateAccountInput!): Account
    migrateAccount(account: MigrateAccountInput): Account
    deleteAccount(id: ID!): Account

    createCategory(category: CreateCategoryInput!): Category
    migrateCategory(category: MigrateCategoryInput!): Category
    updateCategory(id: ID!, category: UpdateCategoryInput): Category
    deleteCategory(id: ID!): Category

    createGroup(group: CreateGroupInput!): Group
    migrateGroup(group: MigrateGroupInput!): Group
    deleteGroup(id: ID!): Group

    createInvoice(invoice: CreateInvoiceInput): Invoice

    createPayee(payee: CreatePayeeInput!): Payee
    migratePayee(payee: MigratePayeeInput!): Payee
    deletePayee(id: ID!): Payee

    createProduct(product: CreateProductInput): Product

    createTransaction(transaction: CreateTransactionInput!): Transaction
    migrateTransaction(transaction: MigrateTransactionInput!): Transaction
    updateTransaction(id: ID!, transaction: UpdateTransactionInput): Transaction
    deleteTransaction(id: ID!): Transaction

    addContributor(userId: ID!): Service
    deleteContributor(userId: ID!): Service
  }
`;

module.exports = typeDefs;
