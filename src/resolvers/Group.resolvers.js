const { commonResolvers } = require('./Query/middlewares');

module.exports = {
  // service: async group => group.getService(),
  categories: async group => group.getCategories({ where: { tombstone: 0 } }),
  count: async group => {
    const categories = await group.getCategories({ where: { tombstone: 0 } });
    const count = await categories.reduce(async (prev, next) => {
      prev = await prev;
      try {
        const nextCount = await next.countTransactions({
          where: { tombstone: 0 }
        });
        return prev + nextCount;
      } catch (err) {
        return prev;
      }
    }, 0);
    return count;
  },
  balance: async group => {
    const categories = await group.getCategories({ where: { tombstone: 0 } });
    const transactions = await categories.reduce(async (prev, next) => {
      prev = await prev;
      try {
        const ts = await next.getTransactions({ where: { tombstone: 0 } });
        if (ts && ts.length) {
          console.log('Got !');
          prev = [prev, ts].flat();
        }
      } catch (err) {
        console.log(err);
      }
      return prev;
    }, []);
    return transactions.reduce((prev, next) => prev + next.amount, 0);
  },
  ...commonResolvers
};
