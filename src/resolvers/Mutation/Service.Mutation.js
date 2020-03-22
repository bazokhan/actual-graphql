module.exports = {
  addContributor: async (root, { userId }, context) => {
    try {
      const { author } = context;
      if (!author || !author.id) return new Error('No author found!');
      const service = await author.getOwner();
      if (!service || !service.id) return new Error('No service found!');
      const contributors = await service.getUsers();
      if (contributors.map(contributor => contributor.id).includes(userId))
        return new Error('Already a contributor!');
      const result = await service.setUsers(userId);
      if (!result || !result.length) return new Error("Couldn't update!");
      return service;
    } catch (err) {
      console.log(err);
      return null;
    }
  },
  deleteContributor: async (root, { userId }, context) => {
    try {
      const { author } = context;
      if (!author || !author.id) return new Error('No author found!');
      const service = await author.getOwner();
      if (!service || !service.id) return new Error('No service found!');
      const contributors = await service.getUsers();
      if (!contributors.map(contributor => contributor.id).includes(userId))
        return new Error('Not a contributor!');
      const result = await service.removeUser(userId);
      console.log(result);
      return service;
    } catch (err) {
      console.log(err);
      return null;
    }
  }
};
