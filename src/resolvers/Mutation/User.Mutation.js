const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const uuidv1 = require('uuid/v1');

const {
  isValidNameLength,
  isValidNameChars,
  isValidEmail,
  isValidPassword
} = require('./helpers');

module.exports = {
  login: async (
    root,
    { credentials: { name, email, password } },
    { models }
  ) => {
    const userByName = await models.User.findOne({ where: { name } });
    const userByEmail = await models.User.findOne({ where: { email } });
    const user = userByName || userByEmail;
    if (!user) {
      return new Error('Invalid username or email');
    }
    const match = await bcrypt.compare(password, user.password);
    if (!match) {
      return new Error('Invalid password');
    }
    const token = jwt.sign(
      { id: user.id, name: user.name, email: user.email },
      '112156s4agf3qrewgr$#%@#$',
      {
        expiresIn: 60 * 60 * 24 * 2
      }
    );
    if (!token) {
      return new Error('something went wrong. Please try again!');
    }
    return token;
  },

  createUser: async (
    root,
    { user: { name, role, email, password } },
    { models }
  ) => {
    if (!isValidNameLength(name))
      return new Error(
        'Username is not valid. Minimum of 5 characters needed.'
      );
    if (!isValidNameChars(name))
      return new Error(
        "Username is not valid. Only letters, numbers and '-' are  acceptable."
      );
    if (!isValidEmail(email)) return new Error('Email is not valid.');
    if (!isValidPassword(password))
      return new Error('Password is not valid. Minimum of 6 characters needed');
    const newUser = await models.User.create({
      id: uuidv1(),
      name,
      role,
      email,
      tombstone: 0,
      password: await bcrypt.hash(password, 10)
    });
    await newUser.createService({
      id: uuidv1()
    });
    return newUser;
  }
};
