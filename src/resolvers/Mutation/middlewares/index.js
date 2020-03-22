const uuid = require('uuid/v4');

const create = async (modelName, input, context) => {
  try {
    const { models, author } = context;
    if (!author || !author.id) return new Error('No author found!');
    const service = await author.getOwner();
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

const update = async (modelName, id, input, context) => {
  try {
    const { models, author } = context;
    if (!author || !author.id) return new Error('No author found!');
    const service = await author.getOwner();
    if (!service || !service.id) return new Error('No service found!');
    let target = await models[modelName].findByPk(id);
    if (!target) return new Error(`${modelName} to be updated was not found!`);
    Object.keys(input).reduce(async (prev, key) => {
      prev = await prev;
      await prev.update({ [key]: input[key] });
      return prev;
    }, target);
    return target;
  } catch (err) {
    console.log(err);
    return null;
  }
};

const migrate = async (modelName, input, context) => {
  try {
    const { models, author } = context;
    if (!author || !author.id) return new Error('No author found!');
    const service = await author.getOwner();
    if (!service || !service.id) return new Error('No service found!');
    return models[modelName].create({
      ...input,
      serviceId: service.id
    });
  } catch (err) {
    console.log(err);
    return null;
  }
};

const remove = async (modelName, id, context, validator) => {
  try {
    let willDelete = true;
    const { models } = context;
    const target = await models[modelName].findByPk(id);
    if (!target) return new Error(`${modelName} to be deleted was not found!`);
    if (validator) {
      willDelete = await validator(target);
    }
    if (willDelete === true) {
      return target.update({
        tombstone: 1
      });
    }
    return willDelete;
  } catch (err) {
    console.log(err);
    return null;
  }
};

module.exports = { create, migrate, remove, update };
