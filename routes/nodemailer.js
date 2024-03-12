const express = require("express");
const { sendMail } = require("../controllers/mailController");

const route = express.Router();

// This section will help you get a list of all the records.
route.post("/send-email", sendMail);

module.exports = route;
