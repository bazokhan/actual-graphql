const fs = require('fs');
const express = require('express');
const path = require('path');
const getModels = require('./map-models');
const getMigrations = require('./map-migrations');
const getTypes = require('./map-schema');
const transpile = require('./transpile-file');
const util = require('util');

const modelsPath = path.resolve(__dirname, '../models');
const migrationsPath = path.resolve(__dirname, '../migrations');
const router = express.Router();
const lstat = util.promisify(fs.lstat);

const cron = require('node-cron');

const modifiedTimes = {};

const autoTranspile = cron.schedule('*/5 * * * * *', async () => {
  await getModels(modelsPath);
  await getMigrations(migrationsPath);
  await getTypes();
  const srcFiles = fs.readdirSync(path.resolve(__dirname, './src'));
  await srcFiles.reduce(async (prev, fileName) => {
    try {
      const fileStats = await lstat(path.resolve(__dirname, './src', fileName));
      if (
        JSON.stringify(modifiedTimes[fileName]) ===
        JSON.stringify(fileStats.mtime)
      )
        return;
      console.log('Updating files..');
      console.log('Changes detected at ' + fileName);
      console.log(fileStats.mtime);
      modifiedTimes[fileName] = fileStats.mtime;
      await transpile(fileName);
    } catch (err) {
      console.log(err);
    }
  }, []);
});

autoTranspile.start();

router.get('/', async (req, res) => {
  res.set('Cache-Control', 'no-store, no-cache, must-revalidate, private');
  try {
    res.status(200).sendFile(path.resolve(__dirname, './client', 'index.html'));
  } catch (err) {
    console.log(err);
    res.status(500).send('Server Error');
  }
});
module.exports = router;
