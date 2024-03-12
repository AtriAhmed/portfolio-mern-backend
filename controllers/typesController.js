const connection = require('../config/connection');
const { isAuthenticated } = require('../middlewares/isAuthenticated');
const Type = connection.models.Type;


// This help convert the id from string to ObjectId for the _id.
const ObjectId = require("mongodb").ObjectId;


// This section will help you get a list of all the records.
function getTypes(req, res) {
  Type.find().then(data => {
    res.status(200).json(data)
  }).catch(err => {
    res.status(404).json(err)
  })
};

// This section will help you get a single record by id
function getTypeById(req, res) {

  let myquery = { _id: ObjectId(req.params.id) };
  Type
    .findOne(myquery, function (err, result) {
      if (err) throw err;
      res.json(result);
    });
};

// This section will help you create a new record.
const addType = [isAuthenticated, (req, response) => {

  let myobj = {
    name: req.body.name
  };

  Type.create(myobj).then(res => {
    response.json(res);
  }).catch(err => {
    response.json(err)
  })
}]

// This section will help you update a record by id.
const updateType = [isAuthenticated, (req, response)=> {

  let myquery = { _id: ObjectId(req.params.id) };
  let newvalues = {
    $set: {
      name: req.body.name
    },
  };
  Type
    .updateOne(myquery, newvalues).then((res) => {
      response.json(res);
    }).catch(err => {
      response.json(err)
    })
}]

// This section will help you delete a record
const deleteType = [isAuthenticated, (req, response) => {

  let myquery = { _id: ObjectId(req.params.id) };
  Type.deleteOne(myquery, function (err, obj) {
    if (err) throw err;
    response.json(obj);
  });
}]

module.exports = {getTypes, getTypeById, addType, updateType, deleteType};