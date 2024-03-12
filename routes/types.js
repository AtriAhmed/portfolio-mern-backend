const express = require("express");
const { getTypes, getTypeById, addType, updateType, deleteType } = require("../controllers/typesController");

const route = express.Router();

// This section will help you get a list of all the records.
route.get("/get-types", getTypes);

// This section will help you get a single record by id
route.get("/get-type/:id", getTypeById);

// This section will help you create a new record.
route.post("/add-type", addType);

// This section will help you update a record by id.
route.put("/update-type/:id", updateType);

// This section will help you delete a record
route.delete("/delete-type/:id", deleteType);

module.exports = route;
