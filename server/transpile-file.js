const fs = require('fs');
const path = require('path');
const babel = require('@babel/core');
const conf = require('./babel.config.json');
const util = require('util');

const transpileFile = util.promisify(babel.transformFile);

const transpile = async fileName => {
  const file = path.resolve(__dirname, './src', fileName);
  try {
    if (fileName.match(/\.map\.js/)) {
      const transpiled = await transpileFile(file, conf);
      fs.writeFileSync(
        path.resolve(__dirname, './client', fileName),
        transpiled.code
      );
    } else if (fileName.match(/vendor\.js/)) {
      fs.copyFileSync(
        path.resolve(__dirname, './src', fileName),
        path.resolve(__dirname, './client', fileName)
      );
    } else if (fileName.match(/\.js/)) {
      const transpiled = await transpileFile(file, conf);
      fs.writeFileSync(
        path.resolve(__dirname, './client', fileName),
        transpiled.code
      );
    } else {
      fs.copyFileSync(
        path.resolve(__dirname, './src', fileName),
        path.resolve(__dirname, './client', fileName)
      );
    }
  } catch (err) {
    console.log(err);
    return null;
  }
};

module.exports = transpile;
