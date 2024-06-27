const dbConnect = require('../config/dbConnect');
const { isAuthenticated } = require('../middlewares/isAuthenticated');
const Experience = require("../models/Experience")

const ObjectId = require("mongodb").ObjectId;

async function getExperience(req, res) {
  await dbConnect();
  Experience.find().then(data => {
    res.status(200).json(data)
  }).catch(err => {
    res.status(404).json(err)
  })
}

async function getExperienceById(req, res) {
  await dbConnect();
  let myquery = { _id: ObjectId(req.params.id) };
  Experience
    .findOne(myquery, function (err, result) {
      if (err) throw err;
      res.json(result);
    });
}

const addExperience = [isAuthenticated, async (req, response) => {
  await dbConnect();

  let myobj = {
    name: req.body.name,
    position: req.body.position,
    date: req.body.date,
    description: req.body.description,
  };

  Experience.create(myobj).then(res => {
    response.json(res);
  }).catch(err => {
    response.json(err)
  })
}]

const updateExperience = [isAuthenticated, async (req, response) => {
  await dbConnect();
  let myquery = { _id: ObjectId(req.params.id) };
  let newvalues = {
    $set: {
      name: req.body.name,
      position: req.body.position,
      date: req.body.date,
      description: req.body.description,
    },
  };
  Experience.updateOne(myquery, newvalues).then((res) => {
    response.json(res);
  }).catch(err => {
    response.json(err)
  })
}]

const deleteExperience = [isAuthenticated, async (req, response) => {
  await dbConnect();
  let myquery = { _id: ObjectId(req.params.id) };
  Experience.deleteOne(myquery).then(res => {
    response.json(res);
  }).catch(err => {
    response.json(err)
  });
}]

module.exports = { getExperience, getExperienceById, addExperience, updateExperience, deleteExperience }