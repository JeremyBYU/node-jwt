const bcrypt = require('bcryptjs');
const Waterline = require('waterline');
const User = Waterline.Collection.extend({
  identity: 'user',
  connection: 'default',
  attributes: {
    firstName: 'string',
    lastName: 'string',
    password: 'string',
    // Have to use function definition to bind 'this' correctly (to attributes object)
    comparePassword: function (password) { // eslint-disable-line
      return bcrypt.compareSync(password, this.password);
    },
  },
  beforeCreate: (values, next) => {
    values.password = bcrypt.hashSync(values.password, 8); // eslint-disable-line
    next();
  },

});

module.exports = User;
