const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');

const { init: initCorn } = require('./corn');
const { init: initDb } = require('./db');
const app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

// initialize db
initDb().then(() => {
  console.log('connected to db');
  // initialize corn
  return initCorn();
}).catch(error => {
  console.error(error);
});

// init routes
app.use('/', require('./routes'));



module.exports = app;
