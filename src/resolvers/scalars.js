const { Kind } = require('graphql/language');
const { GraphQLScalarType } = require('graphql');

const serialize = value => {
  return typeof value === 'string' ? value : null;
};

const parseValue = value => (typeof value === 'string' ? value : null);

const parseLiteral = ast => (ast.kind === Kind.STRING ? ast.value : null);

const Token = new GraphQLScalarType({
  name: 'Token',
  description: 'token',
  serialize,
  parseValue,
  parseLiteral
});

module.exports = { Token };
