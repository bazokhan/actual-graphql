module.exports = {
  service: async user => user.getService(),
  deleted: async user => Boolean(user.tombstone)
};
