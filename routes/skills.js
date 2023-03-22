const express = require("express");

// recordRoutes is an instance of the express router.
// We use it to define our routes.
// The router will be added as a middleware and will take control of requests starting with path /record.
const recordRoutes = express.Router();

const connection = require('../config/connection');
const Skill = connection.models.Skill;


// This help convert the id from string to ObjectId for the _id.
const ObjectId = require("mongodb").ObjectId;

recordRoutes.route("/get-types-with-skills").get(function (req, res) {

  Skill
    .aggregate([{ $group: { _id: "$type", records: { $push: "$$ROOT" } } }])
    .then(result => {
      res.json(result);
    }).catch(err => {
      console.log(err)
    })
});


// This section will help you get a list of all the records.
recordRoutes.route("/get-all-skills").get(function (req, res) {
  Skill.find().then(data => {
    res.status(200).json(data)
  }).catch(err => {
    res.status(404).json(err)
  })
});

// This section will help you get a single record by id
recordRoutes.route("/get-skill/:id").get(function (req, res) {
  Skill
    .findOne(myquery, function (err, result) {
      if (err) throw err;
      res.json(result);
    });
});

// This section will help you create a new record.
recordRoutes.route("/add-skill").post(function (req, response) {

  let myobj = {
    name: req.body.name,
    level: req.body.level,
    type: req.body.type
  };
  Skill.create(myobj).then(res => {
    response.json(res);
  }).catch(err => {
    response.json(err)
  })
});

// This section will help you update a record by id.
recordRoutes.route("/update-skill/:id").put(function (req, response) {

  let myquery = { _id: ObjectId(req.params.id) };
  let newvalues = {
    $set: {
      name: req.body.name,
      level: req.body.level,
      type: req.body.type
    },
  };
  Skill
    .updateOne(myquery, newvalues).then((res) => {
      response.json(res);
    }).catch(err => {
      response.json(err)
    })
});

// This section will help you delete a record
recordRoutes.route("/delete-skill/:id").delete((req, response) => {

  let myquery = { _id: ObjectId(req.params.id) };
  Skill.deleteOne(myquery, function (err, obj) {
    if (err) throw err;
    response.json(obj);
  });
});

module.exports = recordRoutes;
