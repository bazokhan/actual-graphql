module.exports = {
  accounts: async user => user.getAccounts({ where: { tombstone: 0 } }),
  deleted: async user => Boolean(user.tombstone)
};
