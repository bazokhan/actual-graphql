const bcrypt = require('bcryptjs');
const uuidv1 = require('uuid/v1');
const jwt = require('jsonwebtoken');
const Op = require('sequelize').Op;

const numerizeDate = dateIsoString => {
  try {
    const [day, month, year] = dateIsoString.split('-');
    if (
      !day ||
      !month ||
      !year ||
      !day.length === 2 ||
      !month.length === 2 ||
      !year.length === 4
    ) {
      throw new Error('Invalid date isoString');
    }
    return Number([year, month, day].join(''));
  } catch {
    return 0;
  }
};

const isValidNameLength = name => name.length > 3;
const isValidNameChars = name => {
  const nameRegex = /^\w+$/;
  return nameRegex.test(name);
};

const isValidEmail = email => {
  const emailRegex = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;
  return emailRegex.test(email);
};

const isValidPassword = pass => pass.length > 5;

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
  createUser: async (root, { user: { name, email, password } }, { models }) => {
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
    return models.User.create({
      id: uuidv1(),
      name,
      email,
      tombstone: 0,
      password: await bcrypt.hash(password, 10)
    });
  },
  createAccount: async (root, { account: { userId, name } }, { models }) =>
    models.Account.create({ id: uuidv1(), userId, name, tombstone: 0 }),
  createAccounts: async (root, { accounts }, { models }) => {
    return accounts.reduce(async (prev, { userId, name }) => {
      prev = await prev;
      const createdAccount = await models.Account.create({
        id: uuidv1(),
        userId,
        name,
        tombstone: 0
      });
      if (createdAccount) {
        prev.push(createdAccount);
      }
      return prev;
    }, []);
  },
  createPayee: async (root, { payee: { accountId, name } }, { models }) =>
    accountId
      ? models.Payee.create({
          id: uuidv1(),
          transferAccount: accountId,
          name,
          tombstone: 0
        })
      : models.Payee.create({ id: uuidv1(), name, tombstone: 0 }),
  createPayees: async (root, { payees }, { models }) => {
    return payees.reduce(async (prev, { accountId, accountName, name }) => {
      prev = await prev;
      let accounts;
      if (accountId) {
        accounts = await models.Account.findAll({
          where: {
            id: accountId
          }
        });
        if (!accounts || !accounts.length) {
          return new Error("Couldn't find corresponding accounts by id");
        }
      } else if (accountName) {
        accounts = await models.Account.findAll({
          where: {
            name: accountName
          }
        });
        if (!accounts || !accounts.length) {
          return new Error("Couldn't find corresponding accounts by name");
        }
      }

      const createdPayee =
        accounts && accounts.length
          ? await models.Payee.create({
              id: uuidv1(),
              transferAccount: accounts[0].id,
              name,
              tombstone: 0
            })
          : await models.Payee.create({ id: uuidv1(), name, tombstone: 0 });
      if (createdPayee) {
        prev.push(createdPayee);
      }
      return prev;
    }, []);
  },
  createCatGroup: async (root, { group: { isIncome, name } }, { models }) =>
    isIncome
      ? models.CategoryGroup.create({
          id: uuidv1(),
          isIncome: 1,
          name,
          tombstone: 0
        })
      : models.CategoryGroup.create({
          id: uuidv1(),
          isIncome: 0,
          name,
          tombstone: 0
        }),
  createCatGroups: async (root, { groups }, { models }) => {
    return groups.reduce(async (prev, { isIncome, name }) => {
      prev = await prev;
      const createdGroup = isIncome
        ? await models.CategoryGroup.create({
            id: uuidv1(),
            isIncome: 1,
            name,
            tombstone: 0
          })
        : await models.CategoryGroup.create({
            id: uuidv1(),
            isIncome: 0,
            name,
            tombstone: 0
          });
      if (createdGroup) {
        prev.push(createdGroup);
      }
      return prev;
    }, []);
  },
  createCategory: async (root, { category: { groupId, name } }, { models }) => {
    const categoryGroup = await models.CategoryGroup.findByPk(groupId);
    return models.Category.create({
      id: uuidv1(),
      isIncome: categoryGroup.isIncome || 0,
      name,
      catGroup: groupId,
      tombstone: 0
    });
  },
  createCategories: async (root, { categories }, { models }) => {
    return categories.reduce(async (prev, { groupId, groupName, name }) => {
      prev = await prev;
      let categoryGroups;
      if (groupId) {
        categoryGroups = await models.CategoryGroup.findAll({
          where: {
            id: groupId
          }
        });
      } else if (groupName) {
        categoryGroups = await models.CategoryGroup.findAll({
          where: {
            name: groupName
          }
        });
      }
      if (!categoryGroups || !categoryGroups.length) {
        return new Error("Couldn't find corresponding category groups");
      }
      const createdCategory = await models.Category.create({
        id: uuidv1(),
        isIncome: categoryGroups[0].isIncome || 0,
        name,
        catGroup: categoryGroups[0].id,
        tombstone: 0
      });

      if (createdCategory) {
        prev.push(createdCategory);
      }
      return prev;
    }, []);
  },
  createTransaction: async (
    root,
    { transaction: { amount, notes, date, accountId, categoryId, payeeId } },
    { models }
  ) =>
    models.Transaction.create({
      id: uuidv1(),
      amount,
      notes,
      date: numerizeDate(date),
      acct: accountId,
      category: categoryId,
      payeeId,
      tombstone: 0
    }),
  createTransactions: async (root, { transactions }, { models }) => {
    return transactions.reduce(
      async (
        prev,
        {
          amount,
          notes,
          date,
          accountId,
          accountName,
          categoryId,
          categoryName,
          categoryGroupName,
          payeeId,
          payeeName
        }
      ) => {
        prev = await prev;
        let accounts;
        let categories;
        let payees;
        if (accountId && categoryId && payeeId) {
          accounts = await models.Account.findAll({
            where: {
              id: accountId
            }
          });
          categories = await models.Category.findAll({
            where: {
              id: categoryId
            }
          });
          payees = await models.Payee.findAll({
            where: {
              id: payeeId
            }
          });
        } else if (
          accountName &&
          categoryName &&
          categoryGroupName &&
          payeeName
        ) {
          accounts = await models.Account.findAll({
            where: {
              name: accountName
            }
          });
          if (!accounts)
            return new Error("Couldn't find corresponding ACCOUNT");
          const categoryGroups = await models.CategoryGroup.findAll({
            where: {
              name: categoryGroupName
            }
          });
          if (!categoryGroups)
            return new Error("Couldn't find corresponding GROUP");
          categories = await models.Category.findAll({
            where: {
              [Op.and]: [
                { name: categoryName },
                { catGroup: categoryGroups[0].id }
              ]
            }
          });
          if (!categories)
            return new Error("Couldn't find corresponding CATEGORY");
          payees = await models.Payee.findAll({
            where: {
              name: payeeName
            }
          });
          if (!payees) return new Error("Couldn't find corresponding PAYEE");
        }
        try {
          const createdTransaction = await models.Transaction.create({
            id: uuidv1(),
            amount,
            notes,
            date,
            acct: accounts[0].id,
            category: categories[0].id,
            payeeId: payees[0].id,
            tombstone: 0
          });

          if (createdTransaction) {
            prev.push(createdTransaction);
          }
        } catch (e) {
          console.log(e);
        }
        return prev;
      },
      []
    );
  }
};
