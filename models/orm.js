const Waterline = require('waterline');
const orm = new Waterline();

const models = require('./allModels.js');

orm.loadCollection(models.User);

module.exports = {
  orm,
};
