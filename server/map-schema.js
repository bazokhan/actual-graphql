const fs = require('fs');
const path = require('path');
const schema = require('../src/schema');
const util = require('util');
const readFile = util.promisify(fs.readFile);

const kinds = {
  ObjectTypeDefinition: 'type',
  InputObjectTypeDefinition: 'input',
  EnumTypeDefinition: 'enum',
  ScalarTypeDefinition: 'scalar'
};

const simplifyType = type => {
  if (!type.type) return type.name ? type.name.value : type.kind;
  let simplifiedType = {};
  if (type.name) {
    simplifiedType.name = type.name.value;
  }
  if (type.kind === 'NonNullType' || type.kind === 'ListType') {
    simplifiedType.required = type.kind === 'NonNullType';
    simplifiedType.list = type.kind === 'ListType';
  }
  return type.arguments && type.arguments.length
    ? {
        ...simplifiedType,
        is: simplifyType(type.type),
        arguments: type.arguments.map(simplifyType)
      }
    : {
        ...simplifiedType,
        is: simplifyType(type.type)
      };
};

const getTypes = async () => {
  let types = [];
  try {
    types = schema.definitions.map(definition => ({
      kind: kinds[definition.kind],
      name: definition.name.value,
      fields: definition.fields ? definition.fields.map(simplifyType) : []
    }));
  } catch (err) {
    console.log(err);
  }
  try {
    const writableFilePath = path.resolve(__dirname, './src', 'schema.map.js');
    try {
      const oldData = await readFile(
        path.resolve(__dirname, './src', writableFilePath)
      );
      if (oldData) {
        if (
          oldData.toString().length ===
          ('export default ' + JSON.stringify(types)).length
        ) {
          return;
        }
      }
    } catch (ex) {
      console.log(ex);
    }
    fs.writeFileSync(writableFilePath, 'export default ');
    fs.appendFileSync(writableFilePath, JSON.stringify(types));
  } catch (err) {
    console.log(err);
  }
};

module.exports = getTypes;
