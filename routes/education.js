const express = require("express");
const educationController = require("../controllers/educationController");

// route is an instance of the express router.
// We use it to define our routes.
// The router will be added as a middleware and will take control of requests starting with path /record.
const route = express.Router();


// This section will help you get a list of all the records.
route.get("/get-education", educationController.getEducation);


// This section will help you create a new record.
route.post("/add-education", educationController.addEducation);

// This section will help you update a record by id.
route.put("/update-education/:id", educationController.updateController);

module.exports = route;
