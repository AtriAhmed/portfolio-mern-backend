const express = require("express");
const app = express();
const cors = require("cors");
const fileUpload = require("express-fileupload")
require("dotenv").config({ path: "./config.env" });

const session = require('express-session')
const PORT = process.env.PORT || 5000;

const connection = require('./config/connection');
const User = connection.models.User;

const passport = require('passport')
require('./config/passportConfig')(passport) // pass passport for configuration

const sessionStore = require('./config/promiseConnection')
var corsOptions = {
  credentials: true,
  origin: ['http://localhost:3000', 'http://localhost:5173', 'https://atriahmed.advanceticsoft.com']
}

app.use(cors(corsOptions));
app.use(express.json());
app.use(fileUpload())
app.use(express.static(__dirname + '/public'));
app.use(
  session({
    secret: process.env.MY_SECRET,
    store: sessionStore,
    resave: false,
    saveUninitialized: false,
    cookie: {
      maxAge: 3600000, // 3600000 1 hour in milliseconds. The expiration time of the cookie to set it as a persistent cookie.
      sameSite: true
    }
  })
)
app.use(passport.initialize())
app.use(passport.session())
app.use(require("./routes/experience"));
app.use(require("./routes/work"));
app.use(require("./routes/skills"));
app.use(require("./routes/types"));
app.use(require("./routes/nodemailer"));
app.use(require("./routes/login"));
app.use(require("./routes/logout"));
app.use(require("./routes/about"));


app.listen(PORT, () => {
  User.find({}).then(res => { console.log("connected to mongodb") }).catch(err => console.log(err))
  console.log(`Server is running on port: ${PORT}`);
});
