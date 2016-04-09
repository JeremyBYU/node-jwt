const Waterline = require('waterline');
const User = Waterline.Collection.extend({
  identity: 'user',
  connection: 'default',
  attributes: {
    firstName: 'string',
    lastName: 'string',
    password: 'string',
  },
});

module.exports = User;
