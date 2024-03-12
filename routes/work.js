const express = require("express");
const { getWork, getWorkById, addWork, updateWork, deleteWork } = require("../controllers/workController");

const route = express.Router();

// This section will help you get a list of all the records.
route.get("/get-all-work", getWork);

// This section will help you get a single record by id
route.get("/get-work/:id", getWorkById);

// This section will help you create a new record.
route.post("/add-work", addWork);

// This section will help you update a record by id.
route.put("/update-work/:id", updateWork);

// This section will help you delete a record
route.delete("/delete-work/:id",deleteWork);

module.exports = route;
