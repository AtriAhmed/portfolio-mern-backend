const express = require("express");

// recordRoutes is an instance of the express router.
// We use it to define our routes.
// The router will be added as a middleware and will take control of requests starting with path /record.
const recordRoutes = express.Router();

const passport = require('passport')

// '/api/login' route
recordRoutes.route('/login').post(
  // Using local strategy to redirect back to the signin page if there is an error
  passport.authenticate('local'),
  (req, res) => {
    res.status(200).json({ user: req.user })
  }
)

// '/api/login/status' route
recordRoutes.route('/login/status').get((req, res) => {
  if (req.isAuthenticated()) {
    return res.status(200).json({ user: req.user })
  }
  res.status(200).json({
    user: {
      type: 'visitor',
      userId: 0,
      username: ''
    }
  })
})

module.exports = recordRoutes;