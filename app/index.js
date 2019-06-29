const express = require('express');
const compression = require('compression');
const bodyParser = require('body-parser');
const db = require('./db');
const router = require('./router');
require('dotenv').config({ path: './config/.env' });

const app = express();

app.use(compression());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(router);

db.connect({
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  dbname: process.env.DB_NAME,
});

app.listen(process.env.PORT, () => {
  console.log('App started on port: ', process.env.PORT);
});
