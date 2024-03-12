const express = require("express");
const { login, getLoginStatus } = require("../controllers/authController");

const route = express.Router();

// '/api/login' route
route.post('/login', login);

// '/api/login/status' route
route.get('/login/status', getLoginStatus);

module.exports = route;