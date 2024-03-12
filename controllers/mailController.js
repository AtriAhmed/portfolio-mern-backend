const nodemailer = require("nodemailer");

function htmlBody(name, email, subject, message) {
  return `<div>
  <div style="display:flex;gap:4px"><div style="font-weight:bold">Name:</div> <div>${name}</div></div>
  <div style="display:flex;gap:4px"><div style="font-weight:bold">Email:</div> <div>${email}</div></div>
  <div style="display:flex;gap:4px"><div style="font-weight:bold">Subject:</div> <div>${subject}</div></div>
  <div style="display:flex;gap:4px"><div style="font-weight:bold">Message:</div> <div>${message}</div></div>
  </div>`
}

async function sendMail(req, res) {
  // create reusable transporter object using the default SMTP transport
  let transporter = nodemailer.createTransport({
    host: process.env.MAIL_HOST,
    port: 465,
    secure: true, // true for 465, false for other ports
    auth: {
      user: "contact@ahmedatri.com", // generated ethereal user
      pass: process.env.MAIL_PASSWORD, // generated ethereal password
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

}

module.exports = {sendMail};
