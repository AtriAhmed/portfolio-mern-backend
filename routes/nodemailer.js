const express = require("express");
const nodemailer = require("nodemailer");

function htmlBody(name, email, subject, message) {
  return `<div>
  <div style="display:flex;gap:4px"><div style="font-weight:bold">Name:</div> <div>${name}</div></div>
  <div style="display:flex;gap:4px"><div style="font-weight:bold">Email:</div> <div>${email}</div></div>
  <div style="display:flex;gap:4px"><div style="font-weight:bold">Subject:</div> <div>${subject}</div></div>
  <div style="display:flex;gap:4px"><div style="font-weight:bold">Message:</div> <div>${message}</div></div>
  </div>`
}

// recordRoutes is an instance of the express router.
// We use it to define our routes.
// The router will be added as a middleware and will take control of requests starting with path /record.
const recordRoutes = express.Router();

// This will help us connect to the database
const dbo = require("../config/connection");

// This help convert the id from string to ObjectId for the _id.
const ObjectId = require("mongodb").ObjectId;

// This section will help you get a list of all the records.
recordRoutes.route("/send-email").post(async function (req, res) {

  // create reusable transporter object using the default SMTP transport
  let transporter = nodemailer.createTransport({
    host: "mail.ahmedatri.com",
    port: 465,
    secure: true, // true for 465, false for other ports
    auth: {
      user: "contact@ahmedatri.com", // generated ethereal user
      pass: "MyyWHNn8NW}LNT5", // generated ethereal password
    },
    tls: { rejectUnauthorized: false }
  });

  // send mail with defined transport object
  let info = await transporter.sendMail({
    from: "contact@ahmedatri.com", // sender address
    to: "atriahmed.1999@gmail.com", // list of receivers
    subject: req.body.subject, // Subject line
    html: htmlBody(req.body.name, req.body.email, req.body.subject, req.body.message) // html body
  });

  res.json(info)

});




module.exports = recordRoutes;
