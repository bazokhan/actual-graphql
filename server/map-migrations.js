const fs = require('fs');
const path = require('path');
const util = require('util');

const readdir = util.promisify(fs.readdir);
const readFile = util.promisify(fs.readFile);

const getMigrations = async migrationsPath => {
  const files = await readdir(migrationsPath);
  const migrations = await files.reduce(async (prev, fileName) => {
    prev = await prev;
    let model = null;
    try {
      const data = await readFile(
        path.resolve(__dirname, migrationsPath, fileName)
      );
      const result = data.toString();

      // Model name
      const modelNameMatch = result.match(
        /queryInterface\.createTable\(([\s\S]*?),/
      );
      if (!modelNameMatch || !modelNameMatch.length) return prev;
      const modelName = modelNameMatch[1].replace(/[\r\n'"     ]/g, '');
      if (!modelName) return prev;
      model = { modelName };

      // Model fields
      try {
        const filedsRegex = new RegExp(
          `['"]${modelName}['"],[\\s\\S]*?{([\\s\\S]*?)\\);`
        );
        const fieldsMatch = result.match(filedsRegex);
        const fields = fieldsMatch[1]
          .split('}')
          .filter(field => field.includes(':'));
        const formattedFields = fields.map(field => {
          const fieldNameMatch = field.match(/[A-Za-z0-9]+: {/);
          if (!fieldNameMatch) return null;
          const fieldName = fieldNameMatch[0].replace(/[\r\n'":{     ]/g, '');
          if (!fieldName) return null;
          const fieldValuesMatch = field.match(/[A-Za-z0-9]+: {([\s\S]*?)$/);
          if (!fieldValuesMatch) return { fieldName };
          return {
            fieldName,
            properties: fieldValuesMatch[1]
              .replace(/[\r\n'"     ]/g, '')
              .split(',')
              .map(value => value.split(':'))
              .map(([propertyName, value]) => ({ propertyName, value }))
          };
        });
        model.fields = formattedFields;
      } catch {
        console.log('No fields for ' + modelName);
      }

      // Model associations
      //   try {
      //     const associatesRegex = new RegExp(
      //       `${modelName}\\.associate = models => {([\\s\\S]*?)$`
      //     );
      //     const associatesMatch = result.match(associatesRegex);
      //     if (!associatesRegex) return prev;
      //     const associates = associatesMatch[1]
      //       .replace(/[\r\n'"     ]/g, '')
      //       .split(';')
      //       .filter(associate => associate.includes(`${modelName}.`));

      //     const formattedAssociates = associates.map(associate => {
      //       const type = associate.match(/hasMany\(/)
      //         ? 'hasMany'
      //         : associate.match(/hasOne\(/)
      //         ? 'hasOne'
      //         : associate.match(/belongsTo\(/)
      //         ? 'belongsTo'
      //         : associate.match(/belongsToMany\(/)
      //         ? 'belongsToMany'
      //         : null;
      //       const toModelMatch = associate.match(/models\.([a-zA-Z0-9]+),/);
      //       const toModel = toModelMatch ? toModelMatch[1] : null;
      //       const foreignKeyMatch = associate.match(/foreignKey:([a-zA-Z0-9]+)}/);
      //       const foreignKey = foreignKeyMatch ? foreignKeyMatch[1] : null;
      //       const throughMatch = associate.match(/through:([a-zA-Z0-9]+)}/);
      //       const through = throughMatch ? throughMatch[1] : null;
      //       return { type, toModel, foreignKey, through };
      //     });
      //     model.associates = formattedAssociates;
      //   } catch {
      //     console.log('No associations for ' + modelName);
      //   }

      prev.push(model);
      return prev;
    } catch (err) {
      console.log(err);
      return prev;
    }
  }, []);
  try {
    fs.writeFileSync(
      path.resolve(__dirname, './src', 'migrations.map.js'),
      'export default '
    );
    fs.appendFileSync(
      path.resolve(__dirname, './src', 'migrations.map.js'),
      JSON.stringify(migrations)
    );
  } catch (err) {
    console.log(err);
  }
};

module.exports = getMigrations;
