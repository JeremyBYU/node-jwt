const express = require('express');
const router = express.Router(); // eslint-disable-line
const jwt = require('jsonwebtoken'); // used to create, sign, and verify tokens
// const User = require('../models/User.js');

/* GET users listing. */
router.get('/', (req, res) => {
  res.send('respond with an open resource');
});

router.post('/authenticate', (req, res) => {
  const User = req.app.models.user;
  User.findOne({ firstName: req.body.firstName })
  .then((user) => {
    if (!user) {
      res.json({
        success: false,
        message: 'Authentication failed.',
      });
    } else {
      // Check if password matches
      if (user.password !== req.body.password) {
        res.json({
          success: false,
          message: 'Authentication failed.',
        });
      } else {
        // TODO dont include user password, remove it
        const token = jwt.sign(user, req.app.get('jwtSecret'), {
          expiresIn: 86400, // expires in 24 hours
        });

        res.json({
          success: true,
          message: 'Enjoy your token!',
          token,
        });
      }
    }
  })
  .catch((err) => {
    console.error(err);
    res.json({
      success: false,
      message: 'Sever failure.',
    });
  });
});

module.exports = router;
