const express = require('express');
const compression = require('compression');
const path = require('path');
const ssr = require('./ssr');
const app = express();

app.use(compression());
app.use(express.static(path.resolve(__dirname, './public')));

app.use('/', ssr);

const port = process.env.PORT || 3030;
app.listen(port, () => {
  console.info(`Running on ${port}...`);
});
