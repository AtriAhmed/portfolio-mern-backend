const express = require("express");

// recordRoutes is an instance of the express router.
// We use it to define our routes.
// The router will be added as a middleware and will take control of requests starting with path /record.
const recordRoutes = express.Router();

// Matches with "api/logout"
recordRoutes.route('/logout').get((req, res, next) => {
  req.session.destroy(err => {
    if (err) {
      console.log(err)
    }
    res.status(200).json({
      user: {
        type: 'visitor',
        userId: 0,
        username: ''
      }
    })
  })
  req.logout(function (err) {
    if (err) { return next(err); }
  })
})

module.exports = recordRoutes;