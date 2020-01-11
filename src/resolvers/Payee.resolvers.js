module.exports = {
  account: async payee => payee.getAccount(),
  transactions: async payee => payee.getTransactions(),
  deleted: async payee => Boolean(payee.tombstone)
};
