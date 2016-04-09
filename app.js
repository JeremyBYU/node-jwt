const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const morgan = require('morgan');
// const mongoose = require('mongoose');

const jwt = require('jsonwebtoken'); // used to create, sign, and verify tokens
const config = require('./config/config'); // get our config file

app.set('jwtSecret', config.secret); // secret letiable
// const User = require('./app/models/user'); // get our mongoose model

const orm = require('./models/orm').orm;
const utils = require('./utils/utils');

app.use(morgan('dev'));
// use body parser so we can get info from POST and/or URL parameters
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true,
}));

const apiRoutes = require('./routes/api');

orm.initialize(config.ormConfig, (err, models) => {
  if (err) {
    return console.error(err);
  }
  // Tease out fully initialised models.
  app.models = models.collections;
  const User = models.collections.user;
  utils.initializeUser(User);

  app.use('/api', apiRoutes);

  // =================================================================
  // start the server ================================================
  // =================================================================
  app.listen(config.port);
  console.log('Magic happens at http://localhost:' + config.port);


  return true;
});
