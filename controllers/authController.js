const passport = require('passport')

// Using local strategy to redirect back to the signin page if there is an error
const login = [passport.authenticate('local'),
(req, res) => {
  res.status(200).json({ user: req.user })
}]

function getLoginStatus(req, res) {
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
}

function logout(req, res, next) {
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
}

module.exports = { login, getLoginStatus, logout }