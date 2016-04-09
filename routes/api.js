const express = require('express');
const router = express.Router(); // eslint-disable-line
// const User = require('../models/User.js');

/* GET users listing. */
router.get('/', (req, res) => {
  res.send('respond with a secret resource');
});

module.exports = router;
