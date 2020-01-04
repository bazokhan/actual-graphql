const models = require("../models");

const context = ({ req, res }) => {
  if (req && req.headers) return { models, ...req.headers };
  return { models };
};

module.exports = context;
