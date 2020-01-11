module.exports = {
  accounts: async user => user.getAccounts(),
  deleted: async user => Boolean(user.tombstone)
};
