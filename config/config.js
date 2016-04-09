const sailsDisk = require('sails-disk');
const ormConfig = {
  adapters: {
    disk: sailsDisk,
  },

  connections: {
    default: {
      adapter: 'disk',
    },
  },
};

module.exports = {
  secret: 'ilovescotchyscotch',
  ormConfig,
  port: process.env.PORT || 8080,
  // database: 'mongodb://192.168.99.100:27017/',
};
