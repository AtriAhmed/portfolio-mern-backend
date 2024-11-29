const express = require("express");
const { logout } = require("../controllers/authController");

const route = express.Router();

// Matches with "api/logout"
route.get('/logout', logout);

module.exports = route;