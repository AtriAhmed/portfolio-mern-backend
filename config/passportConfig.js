const connection = require('./dbConnect');
// const User = connection.models.User;
const User = require('../models/User');
const bcrypt = require('bcrypt');
const dbConnect = require('./dbConnect');
const LocalStrategy = require('passport-local').Strategy

module.exports = passport => {
  //  ======================== Passport Session Setup ============================
  // required for persistent login sessions passport needs ability to serialize and unserialize users out of session
  // used to serialize the user for the session
  passport.serializeUser((user, done) => {
    done(null, user._id)
  })

  // used to deserialize the user

  passport.deserializeUser(async (id, done) => {
    await dbConnect();
    User.findById(id).then((user) => {
      done(null, user)
    }).catch(err => {
      done(err)
    })
  })

  passport.use(
    new LocalStrategy(
      { passReqToCallback: true },
      async (req, username, password, done) => {
        await dbConnect();
        // console.log(`Pass port use local-strategy sign in attempt for: ${username}`)

        if (!req.user && (!username === '' || password.length >= 5)) {
          // callback with username and password from client must match basic requirements before even being compared in DB

          // console.log('attempting to get user from DB')
          User.findOne({ username: username }).then((user) => {
            if (!user) {
              // console.log(`No user found Returning from local-strategy login failed to login ${username}`)

              return done(null, false)
            } else {
              // console.log(`In local Strategy & Found ${username} from database comparing password..`)

              // if user found, compare password against db password and return true or false if it matches

              // console.log(user)

              bcrypt.compare(password, user.password, (err, result) => {
                if (err) {
                  // console.log('error in bcrypt compare')

                  done(err)
                } else if (result) {
                  // console.log(`Successful login for User: ${user.username} ID: ${user.userId} Type:${user.type} type-ID:${user.accessId} removing pw from userObj and attaching to future requests`)

                  delete user.password
                  done(null, user)
                } else {
                  // console.log('Passwords did not match. Failed log in')

                  done(null, false)
                }
              })
            }
          }).catch(err => { done(err) })
        } else if (req.user) {
          // console.log('User attempted to log in while already logged in.')
          done(null, req.user)
        } else {
          // console.log('Login attempt did not meet username and password requirements.')
          return done(null, false)
        }
      }
    )
  )
}
