const fs = require('fs');
const path = require('path');
const util = require('util');

const readdir = util.promisify(fs.readdir);
const readFile = util.promisify(fs.readFile);

const getModels = async modelsPath => {
  const files = await readdir(modelsPath);
  const models = files.reduce(async (prev, fileName) => {
    try {
      prev = await prev;
      const data = await readFile(
        path.resolve(__dirname, modelsPath, fileName)
      );
      const result = data.toString();
      const modelNameMatch = result.match(/sequelize.define\(([\s\S]*?),/);
      if (!modelNameMatch || !modelNameMatch.length) return prev;
      const modelName = modelNameMatch[1].replace(/[\r\n'"     ]/g, '');
      if (!modelName) return prev;
      const filedsRegex = new RegExp(
        `['"]${modelName}['"],[\\s\\S]*?{([\\s\\S]*?)\\);`
      );
      const fieldsMatch = result.match(filedsRegex);
      if (!fieldsMatch) return prev;
      const fields = fieldsMatch[1]
        .split('}')
        .filter(field => field.includes(':'));

      const formattedFields = fields.map(field => {
        const fieldNameMatch = field.match(/[A-Za-z0-9]+: {/);
        if (!fieldNameMatch) return prev;
        const fieldName = fieldNameMatch[0].replace(/[\r\n'":{     ]/g, '');
        if (!fieldName) return prev;
        const fieldValuesMatch = field.match(/[A-Za-z0-9]+: {([\s\S]*?)$/);
        if (!fieldValuesMatch) return prev.push({ name: fieldName });
        return prev.push({
          name: fieldName,
          values: fieldValuesMatch[1]
            .replace(/[\r\n'"     ]/g, '')
            .split(',')
            .map(value => value.split(':'))
            .map(([propertyName, type]) => ({ propertyName, type }))
        });
      });
      prev.push({ model: modelName, fields: formattedFields });
      return prev;
    } catch (err) {
      console.log(err);
      return prev;
    }
  }, []);
  return models;
};

module.exports = getModels;
