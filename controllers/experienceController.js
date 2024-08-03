const uuidv4 = require("uuid").v4;

const dbConnect = require('../config/dbConnect');
const { isAuthenticated } = require('../middlewares/isAuthenticated');
const Experience = require("../models/Experience")

const ObjectId = require("mongodb").ObjectId;
const path = require("path");
const { removeSpaces } = require("../middlewares/removeSpaces");

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

const addExperience = [removeSpaces, isAuthenticated, async (req, response) => {
  await dbConnect();

  if (req.files.image) {
    var file = req.files.image;
    var extension = path.extname(file.name);
    var imageName = uuidv4() + extension;
    var image = `uploads/images/${imageName}`;

    file.mv(`./public/uploads/images/${imageName}`, err => {
      if (err) {
        console.error(err);
      }
    });
  } else image = ''

  const body = req.body;

  let myobj = {
    name: body.name,
    position: body.position,
    date: body.date,
    description: body.description,
    image: image,
  };

  Experience.create(myobj).then(res => {
    response.json(res);
  }).catch(err => {
    response.json(err)
  })
}]

const updateExperience = [isAuthenticated, removeSpaces, async (req, response) => {
  await dbConnect();

  const oldExperience = await Experience.findOne({ _id: ObjectId(req.params.id) });

  if (req.files?.image) {
    var file = req.files.image;
    var extension = path.extname(file.name);
    var imageName = uuidv4() + extension;
    var image = `uploads/images/${imageName}`;

    file.mv(`./public/uploads/images/${imageName}`, err => {
      if (err) {
        console.error(err);
      }
    });
  } else image = ''

  let myquery = { _id: ObjectId(req.params.id) };
  const body = req.body;
  let newvalues = {
    $set: {
      name: body.name,
      position: body.position,
      date: body.date,
      description: body.description,
      image: image ? image : oldExperience.image,
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