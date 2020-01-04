const models = require("../models");
const jwt = require("jsonwebtoken");

const context = async ({ req, res }) => {
  if (req && req.headers) {
    const { authorization } = req.headers;
    if (authorization) {
      const token = authorization.replace("Bearer ", "");
      let decoded = null;
      try {
        decoded = jwt.verify(token, "112156s4agf3qrewgr$#%@#$");
      } catch (e) {
        console.log(e);
        throw new AuthenticationError("Invalid Token");
      }
      if (decoded) {
        const author = await models.User.findByPk(decoded.id);
        if(author) {
          return { models, author, ...req.headers };
        }
      }
    }
    return { models, ...req.headers };
  }
  return { models };
};

module.exports = context;
