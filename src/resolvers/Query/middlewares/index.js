const moderate = async (context, queryFunction) => {
  try {
    const { author } = context;
    if (!author || !author.id) return new Error('You are not logged in!');
    const service = await author.getOwner();
    if (author.role !== 'SUPERADMIN') return new Error('Not authorized!');
    if (!queryFunction) return new Error('Query function must be provided!');
    return queryFunction(service);
  } catch (err) {
    console.log(err);
    return err;
  }
};

const authenticate = async (context, queryFunction) => {
  try {
    const { author } = context;
    if (!author || !author.id) return new Error('You are not logged in!');
    const service = await author.getOwner();
    if (!queryFunction) return new Error('Query function must be provided!');
    return queryFunction(service);
  } catch (err) {
    console.log(err);
    return err;
  }
};

const contribute = async (serviceId, context, queryFunction) => {
  try {
    const { author, models } = context;
    if (!author || !author.id) return new Error('You are not logged in!');
    const service = await models.Service.findByPk(serviceId);
    if (!service) return new Error('No Service Found!');
    const contributors = await service.getUsers({
      where: { tombstone: 0 }
    });
    if (!contributors.includes(author.id))
      return new Error(
        'You are not authorized to view this service, please contact the service owner.'
      );
    if (!queryFunction) return new Error('Query function must be provided!');
    return queryFunction(service);
  } catch (err) {
    console.log(err);
    return err;
  }
};

const transactionResolvers = {
  transactions: async instance =>
    instance.getTransactions({ where: { tombstone: 0 } }),
  count: async instance =>
    instance.countTransactions({ where: { tombstone: 0 } }),
  balance: async instance => {
    const transactions = await instance.getTransactions({
      where: { tombstone: 0 }
    });
    return transactions.reduce((prev, next) => prev + next.amount, 0);
  }
};

const commonResolvers = {
  deleted: async instance => Boolean(instance.tombstone)
};

module.exports = {
  authenticate,
  moderate,
  transactionResolvers,
  commonResolvers,
  contribute
};
