const express = require("express");

// recordRoutes is an instance of the express router.
// We use it to define our routes.
// The router will be added as a middleware and will take control of requests starting with path /record.
const recordRoutes = express.Router();

// This will help us connect to the database
const dbo = require("../db/conn");

// This help convert the id from string to ObjectId for the _id.
const ObjectId = require("mongodb").ObjectId;


// This section will help you get a list of all the records.
recordRoutes.route("/get-all-work").get(function (req, res) {
  let db_connect = dbo.getDb("employees");
  db_connect
    .collection("work")
    .find({})
    .toArray(function (err, result) {
      if (err) throw err;
      res.json(result);
    });
});

// This section will help you get a single record by id
recordRoutes.route("/get-work/:id").get(function (req, res) {
  let db_connect = dbo.getDb();
  let myquery = { _id: ObjectId( req.params.id )};
  db_connect
      .collection("work")
      .findOne(myquery, function (err, result) {
        if (err) throw err;
        res.json(result);
      });
});

// This section will help you create a new record.
recordRoutes.route("/add-work").post(removeSpaces,function (req, response) {
  let db_connect = dbo.getDb();
  console.log(req)
  if(req.files.image){
  var file = req.files.image
  var image = `uploads/images/${file.name}`
  file.mv(`./public/uploads/images/${file.name}`,err=>{
    if(err){
      console.error(err);
    }
  })
}else image = ''

  let myobj = {
    name: req.body.name,
    description: req.body.description,
    technologies: req.body.technologies,
    image: image,
    link: req.body.link
  };
  db_connect.collection("work").insertOne(myobj, function (err, res) {
    if (err) throw err;
    response.json(res);
  });
});

// This section will help you update a record by id.
recordRoutes.route("/update-work/:id").post(function (req, response) {
  let db_connect = dbo.getDb();
  let myquery = { _id: ObjectId( req.params.id )};
  let newvalues = {
    $set: {
        name: req.body.name,
        description: req.body.description,
        technologies: req.body.technologies,
    },
  };
  db_connect
    .collection("work")
    .updateOne(myquery, newvalues, function (err, res) {
      if (err) throw err;
      console.log("1 document updated");
      response.json(res);
    });
});

// This section will help you delete a record
recordRoutes.route("/delete-work/:id").delete((req, response) => {
  let db_connect = dbo.getDb();
  let myquery = { _id: ObjectId( req.params.id )};
  db_connect.collection("work").deleteOne(myquery, function (err, obj) {
    if (err) throw err;
    console.log("1 document deleted");
    response.json(obj);
  });
});

function removeSpaces(req,res,next){
  if(req.files.image){
    req.files.image.name = req.files.image.name.replace(/\s/g, '');
  }
  next()
}

module.exports = recordRoutes;
