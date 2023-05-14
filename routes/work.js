const express = require("express");

// recordRoutes is an instance of the express router.
// We use it to define our routes.
// The router will be added as a middleware and will take control of requests starting with path /record.
const recordRoutes = express.Router();

const connection = require('../config/connection');
const Work = connection.models.Work;


// This help convert the id from string to ObjectId for the _id.
const ObjectId = require("mongodb").ObjectId;


// This section will help you get a list of all the records.
recordRoutes.route("/get-all-work").get(function (req, res) {
  Work
    .find().then(data => {
      res.status(200).json(data)
    }).catch(err => {
      res.status(404).json(err)
    })
});

// This section will help you get a single record by id
recordRoutes.route("/get-work/:id").get(function (req, res) {
  let myquery = { _id: ObjectId(req.params.id) };
  Work
    .findOne(myquery, function (err, result) {
      if (err) throw err;
      res.json(result);
    });
});

// This section will help you create a new record.
recordRoutes.route("/add-work").post(removeSpaces, function (req, response) {

  if (req.files.image) {
    var file = req.files.image
    var image = `uploads/images/${file.name}`
    file.mv(`./public/uploads/images/${file.name}`, err => {
      if (err) {
        console.error(err);
      }
    })
  } else image = ''

  let myobj = {
    name: req.body.name,
    description: req.body.description,
    technologies: req.body.technologies,
    image: image,
    link: req.body.link
  };
  Work.create(myobj).then(res => {
    response.json(res);
  }).catch(err => {
    response.json(err)
  })
});

// This section will help you update a record by id.
recordRoutes.route("/update-work/:id").put(removeSpaces, function (req, response) {
  if (req.files.image) {
    var file = req.files.image
    var image = `uploads/images/${file.name}`
    file.mv(`./public/uploads/images/${file.name}`, err => {
      if (err) {
        console.error(err);
      }
    })
  } else image = ''

  let myquery = { _id: ObjectId(req.params.id) };
  let newvalues = {
    $set: {
      name: req.body.name,
      description: req.body.description,
      technologies: req.body.technologies,
      image: image,
      link: req.body.link
    },
  };
  Work
    .updateOne(myquery, newvalues).then((res) => {
      response.json(res);
    }).catch(err => {
      response.json(err)
    })
});

// This section will help you delete a record
recordRoutes.route("/delete-work/:id").delete((req, response) => {
  let myquery = { _id: ObjectId(req.params.id) };
  Work.deleteOne(myquery, function (err, obj) {
    if (err) throw err;
    response.json(obj);
  });
});

function removeSpaces(req, res, next) {
  if (req.files.image) {
    req.files.image.name = req.files.image.name.replace(/\s/g, '');
  }
  next()
}

module.exports = recordRoutes;
