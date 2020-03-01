module.exports = {
  // accounts: async user => user.getAccounts({ where: { tombstone: 0 } }),
  service: async user => user.getService(),
  deleted: async user => Boolean(user.tombstone)
};
