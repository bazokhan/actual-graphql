const uuid = require('uuid/v4');

const create = async (modelName, input, context) => {
  try {
    const { models, author } = context;
    if (!author || !author.id) return new Error('No author found!');
    const service = await author.getService();
    if (!service || !service.id) return new Error('No service found!');
    return models[modelName].create({
      ...input,
      id: uuid(),
      tombstone: 0,
      serviceId: service.id
    });
  } catch (err) {
    console.log(err);
    return null;
  }
};

module.exports = { create };
