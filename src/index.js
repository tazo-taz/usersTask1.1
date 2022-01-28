const express = require('express');
const bodyParser = require('body-parser');
require('dotenv').config();

const logger = require('./logger');
const companies = require('./routes/companies');
const users = require('./routes/users');

const { PORT } = process.env;

const app = express();

// base middlewares
app.use(bodyParser.json({ limit: '50mb' }));

// routing
app.use(...companies);
app.use('/user', users);
app.use('/users', users);
app.use(require('./routes/default'));

app.listen(PORT, () => {
  logger.log(`Example app listening at http://localhost:${PORT}`);
});
