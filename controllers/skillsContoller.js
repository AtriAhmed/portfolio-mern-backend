const dbConnect = require('../config/dbConnect');
const { isAuthenticated } = require('../middlewares/isAuthenticated');
const Skill = require("../models/Skill");

const ObjectId = require("mongodb").ObjectId;

async function getSkills(req, res) {
  await dbConnect();
  Skill.find().populate("type").then(data => {
    res.status(200).json(data)
  }).catch(err => {
    res.status(404).json(err)
  })
}

async function getSkillById(req, res) {
  await dbConnect();
  Skill
    .findOne(myquery, function (err, result) {
      if (err) throw err;
      res.json(result);
    });
}

const addSkill = [isAuthenticated, async (req, response) => {
  await dbConnect();
  let myobj = {
    name: req.body.name,
    level: req.body.level,
    type: new ObjectId(req.body.type)
  };
  Skill.create(myobj).then(res => {
    response.json(res);
  }).catch(err => {
    response.json(err)
  })
}]

const updateSkill = [isAuthenticated, async (req, response) => {
  await dbConnect();

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
}]

const deleteSkill = [isAuthenticated, async (req, response) => {
  await dbConnect();

  let myquery = { _id: ObjectId(req.params.id) };
  Skill.deleteOne(myquery, function (err, obj) {
    if (err) throw err;
    response.json(obj);
  });
}]

module.exports = { getSkills, getSkillById, addSkill, updateSkill, deleteSkill }
