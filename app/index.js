const express = require('express');
const compression = require('compression');
const bodyParser = require('body-parser');
const db = require('./db');
// const { CronJob } = require('cron');
const router = require('./router');
const parse = require('./parser');
require('dotenv').config({ path: `${__dirname}/config/.env` });

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

app.listen(process.env.PORT, (err) => {
  if (!process.env.PORT || err) return console.log(err);
  console.log('App started on port: ', process.env.PORT);
  parse();
});
