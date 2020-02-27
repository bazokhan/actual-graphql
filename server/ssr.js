const express = require('express');
const path = require('path');
const getModels = require('./map-sql');

const modelsPath = path.resolve(__dirname, '../models');
console.log(modelsPath);
const router = express.Router();
router.get('/', async (req, res) => {
  const response = await getModels(modelsPath);
  console.log(response);
  res.status(200).send(JSON.stringify(response));
});
module.exports = router;
