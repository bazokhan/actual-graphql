const { ApolloServer } = require("apollo-server");
const typeDefs = require("./schema");
const resolvers = require("./resolvers");
const context = require("./context");

const server = new ApolloServer({
  cors: true,
  typeDefs,
  resolvers,
  context
});

server.listen().then(({ url }) => console.log(`Server is running on ${url}`));
