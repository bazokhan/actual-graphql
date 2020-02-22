const { gql } = require('apollo-server');
const { print: addSchema } = require('graphql/language/printer');

const sharedTypeFragment = [
  `deleted: Boolean!`,
  `createdAt: String!`,
  `updatedAt: String!`,
  `service: Service!`
];

const addFragment = fragment => `
    ${fragment[0]}
    ${fragment[1]}
    ${fragment[2]}
    ${fragment[3]}
`;

const User = gql`
  enum UserRoles {
    SUPERADMIN
    USER
  }

  type User {
    id: ID!
    name: String!
    role: UserRoles
    email: String!
    password: String!
    accounts: [Account!]!
    ${addFragment(sharedTypeFragment)}
  }

  input CreateUserInput {
    name: String!
    email: String!
    password: String!
  }
`;

const Account = gql`
  type Account {
    id: ID!
    name: String!
    user: User!
    transactions: [Transaction!]!
    count: Int
    balance: Float
    ${addFragment(sharedTypeFragment)}
  }

  input CreateAccountInput {
    name: String!
    tombstone: Int
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
    ${addFragment(sharedTypeFragment)}
  }

  input CreatePayeeInput {
    name: String!
    accountId: ID
    accountName: String
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
    ${addFragment(sharedTypeFragment)}
  }

  input CreateGroupInput {
    name: String!
    isIncome: Boolean!
    tombstone: Int
  }
`;

const Category = gql`
  type Category {
    id: ID!
    name: String!
    isIncome: Boolean!
    group: Group!
    transactions: [Transaction!]!
    count: Int
    balance: Float
    ${addFragment(sharedTypeFragment)}
  }

  input CreateCategoryInput {
    name: String!
    groupId: ID
    groupName: String
    tombstone: Int
  }

  input UpdateCategoryInput {
    name: String
    groupId: ID
  }
`;

const Transaction = gql`
  type Transaction {
    id: ID!
    amount: Float!
    notes: String
    date: String!
    account: Account!
    category: Category!
    payee: Payee!
    ${addFragment(sharedTypeFragment)}
  }

  input CreateTransactionInput {
    amount: Float!
    notes: String
    date: String!
    accountId: ID
    categoryId: ID
    payeeId: ID
    deleted: Boolean
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

  input MigrateTransactionInput {
    id: ID
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
    ${addFragment(sharedTypeFragment)}
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
    ${addFragment(sharedTypeFragment)}
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
    members: [User]
    accounts: [Account]
    payees: [Payee]
    groups: [Group]
    categories: [Category]
    transactions: [Transaction]
    invoices: [Invoice]
    products: [Product]
    createdAt: String!
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
    payees(includeDeleted: Boolean, onlyDeleted: Boolean): [Payee!]!
    groups(includeDeleted: Boolean, onlyDeleted: Boolean): [Group!]!
    categories(includeDeleted: Boolean, onlyDeleted: Boolean): [Category!]!
    transactions(includeDeleted: Boolean, onlyDeleted: Boolean): [Transaction!]!
    invoices(includeDeleted: Boolean, onlyDeleted: Boolean): [Invoice!]!
    products(includeDeleted: Boolean, onlyDeleted: Boolean): [Product!]!
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
    migrateTransactions(
      transactions: [MigrateTransactionInput!]!
    ): [Transaction]!
    deleteAccount(id: ID!): Account
    deleteCategory(id: ID!): Category
    deleteGroup(id: ID!): Group
    deletePayee(id: ID!): Payee
    deleteTransaction(id: ID!): Transaction
    updateCategory(id: ID!, category: UpdateCategoryInput): Category!
  }
`;

// console.log(
//   typeDefs.definitions.find(def => def.name && def.name.value === 'User').fields
// );

// console.log(
//   typeDefs.definitions.map(({ kind, name: { value }, description }) =>
//     description && description.value
//       ? {
//           name: value,
//           kind: kind.replace('TypeDefinition', ''),
//           description: description.value
//         }
//       : { name: value, kind: kind.replace('TypeDefinition', '') }
//   )
// );

module.exports = typeDefs;
