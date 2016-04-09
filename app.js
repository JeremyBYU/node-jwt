const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const morgan = require('morgan');

const jwtExpress = require('express-jwt');
const config = require('./config/config'); // get our config file

app.set('jwtSecret', config.secret); // store jwt secret key
const authenticate = jwtExpress({
  secret: config.secret,
});

const orm = require('./models/orm').orm;
const utils = require('./utils/utils');

app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true,
}));

const indexRoutes = require('./routes/index');
const apiRoutes = require('./routes/api');

orm.initialize(config.ormConfig, (err, models) => {
  if (err) {
    return console.error(err);
  }
  // Tease out fully initialised models.
  app.models = models.collections;
  // Intialize First User (Jeremy, password)
  utils.initializeUser(app.models.user);

  // Set Routes
  app.use('/', indexRoutes);
  app.use('/api', authenticate, apiRoutes);

  // Start the server
  app.listen(config.port);
  console.log('Magic happens at http://localhost:' + config.port);

  return true;
});
