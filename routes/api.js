const express = require('express');
const router = express.Router(); // eslint-disable-line
// const User = require('../models/User.js');

/* GET users listing. */
router.get('/', (req, res) => {
  res.json({
    success: true,
    message: 'You hit a Super Secret API Point by using your token!',
  });
});

module.exports = router;
