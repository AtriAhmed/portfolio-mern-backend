const express = require("express");

const route = express.Router();

const aboutController = require("../controllers/aboutController");

// This section will help you get a list of all the records.
route.get("/get-about", aboutController.getAbout);

// This section will help you get a single record by id
route.get("/get-about/:id", aboutController.getAboutById);

// This section will help you create a new record.
route.post("/add-about", aboutController.addAbout);

// This section will help you update a record by id.
route.put("/update-about/:id", aboutController.updateAbout); 

// This section will help you delete a record
route.delete("/delete-about/:id", aboutController.deleteAbout);

module.exports = route;
