const express = require('express');
const compression = require('compression');
const path = require('path');
const ssr = require('./ssr');
const app = express();

app.use(compression());
app.use('/', ssr);
app.use(express.static(path.resolve(__dirname, './client')));

const port = process.env.PORT || 3030;
app.listen(port, () => {
  console.info(`Running on ${port}...`);
});
