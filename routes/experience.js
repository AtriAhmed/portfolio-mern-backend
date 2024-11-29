const express = require("express");
const experienceController = require("../controllers/experienceController");

const route = express.Router();

// This section will help you get a list of all the records.
route.get("/get-all-experience", experienceController.getExperience);

// This section will help you get a single record by id
route.get("/get-experience/:id", experienceController.getExperienceById);

// This section will help you create a new record.
route.post("/add-experience", experienceController.addExperience);

// This section will help you update a record by id.
route.put("/update-experience/:id", experienceController.updateExperience);

// This section will help you delete a record
route.delete("/delete-experience/:id", experienceController.deleteExperience);

module.exports = route;
