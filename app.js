const express = require('express');
const app = express();
const http = require('http').Server(app); // eslint-disable-line
const io = require('socket.io')(http);
const bodyParser = require('body-parser');
const morgan = require('morgan');

const jwtExpress = require('express-jwt'); // JWT express middleware
const socketioJwt = require('socketio-jwt'); // JWT Socket IO middleware
const config = require('./config/config'); // get our config file

app.set('jwtSecret', config.secret); // store jwt secret key
const authenticate = jwtExpress({
  secret: config.secret,
});
const socketAuthenticate = socketioJwt.authorize({
  secret: config.secret,
  timeout: 15000, // 15 seconds to send the authentication message
});

const orm = require('./models/orm').orm;
const utils = require('./utils/utils');

app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true,
}));
// Server static files
app.use(express.static('public'));

const indexRoutes = require('./routes/index');
const apiRoutes = require('./routes/api');

// Set Routes
app.use('/', indexRoutes);
app.use('/api', authenticate, apiRoutes);
// Error Handler
app.use('/api', (err1, req, res, next) => {
  if (err1.name === 'UnauthorizedError' || 'jwt') {
    res.status(401).json({
      success: false,
      message: 'Authorization failed',
    });
  }
  next();
});
// Initializing connection to 'database', which is just a file in this case
// db file should be in the .tmp folder.
orm.initialize(config.ormConfig, (err, models) => {
  if (err) {
    console.error(err);
  }
  // Tease out fully initialised models and set to app instance
  app.models = models.collections;
  // Intialize First User (Jeremy, password)
  utils.initializeUser(app.models.user);
  // Start the server
  http.listen(config.port);
  console.log('Magic happens at http://localhost:' + config.port);
});

// Why dont I see any errors for socket io when the token is invalid?
// set authorization for socket.io
io
  .on('connection', socketAuthenticate)
  .on('authenticated', (socket) => {
    // this socket is authenticated, we are good to handle more events from it.
    console.log('hello! ' + socket.decoded_token.firstName);
    socket.on('message', (message) => {
        // this socket is authenticated, we are good to handle more events from it.
        console.log(`Message from ${socket.decoded_token.firstName}: ${message}`);
    });
  });
