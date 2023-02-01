const express = require("express");
const nodemailer = require("nodemailer");

// recordRoutes is an instance of the express router.
// We use it to define our routes.
// The router will be added as a middleware and will take control of requests starting with path /record.
const recordRoutes = express.Router();

// This will help us connect to the database
const dbo = require("../db/conn");

// This help convert the id from string to ObjectId for the _id.
const ObjectId = require("mongodb").ObjectId;

// This section will help you get a list of all the records.
recordRoutes.route("/send-email").post(async function (req, res) {

    // create reusable transporter object using the default SMTP transport
    let transporter = nodemailer.createTransport({
      host: "smtp-relay.sendinblue.com",
      port: 587,
      secure: false, // true for 465, false for other ports
      auth: {
        user: "atriahmed.1999@gmail.com", // generated ethereal user
        pass: "Ab1LmpzkhvKx4q6c", // generated ethereal password
      },
    });

    // send mail with defined transport object
    let info = await transporter.sendMail({
      from: req.body.email, // sender address
      to: "atriahmed.1999@gmail.com", // list of receivers
      subject: req.body.subject, // Subject line
      text: req.body.message, // plain text body
      //html: `<b>${req.body.message}</b>`, // html body
    });
    
    res.json(info)
    
});




module.exports = recordRoutes;
