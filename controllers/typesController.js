const dbConnect = require('../config/dbConnect');
const { isAuthenticated } = require('../middlewares/isAuthenticated');
const Skill = require('../models/Skill');
const Type = require("../models/Type");


// This help convert the id from string to ObjectId for the _id.
const ObjectId = require("mongodb").ObjectId;


// This section will help you get a list of all the records.
async function getTypes(req, res) {
  await dbConnect()
  Type.find().then(data => {
    res.status(200).json(data)
  }).catch(err => {
    res.status(404).json(err)
  })
};

// This section will help you get a list of all the records.
async function getTypesWithSkills(req, res) {
  await dbConnect()
  Type.find().then(async (types) => {
    const typesWithSkills = await Promise.all(types.map(async (type) => {
      const skills = await Skill.find({ type: new ObjectId(type._id) });

      return { ...type._doc, skills };
    }));
    res.status(200).json(typesWithSkills);
  }).catch(err => {
    res.status(404).json(err)
  })
};

// This section will help you get a single record by id
async function getTypeById(req, res) {
  await dbConnect();

  let myquery = { _id: ObjectId(req.params.id) };
  Type
    .findOne(myquery, function (err, result) {
      if (err) throw err;
      res.json(result);
    });
};

// This section will help you create a new record.
const addType = [isAuthenticated, async (req, response) => {
  await dbConnect();

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
const updateType = [isAuthenticated, async (req, response) => {
  await dbConnect();

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
const deleteType = [isAuthenticated, async (req, response) => {
  await dbConnect();

  let myquery = { _id: ObjectId(req.params.id) };
  Type.deleteOne(myquery, function (err, obj) {
    if (err) throw err;
    response.json(obj);
  });
}]

module.exports = { getTypes, getTypeById, addType, updateType, deleteType, getTypesWithSkills };