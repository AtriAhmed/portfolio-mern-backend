const connection = require('../config/connection');
const { isAuthenticated } = require('../middlewares/isAuthenticated');
const Skill = connection.models.Skill;

const ObjectId = require("mongodb").ObjectId;

function getSkillsByTypes(req, res) {
  Skill
    .aggregate([{ $group: { _id: "$type", records: { $push: "$$ROOT" } } }])
    .then(result => {
      res.json(result);
    }).catch(err => {
      console.log(err)
    })
}

function getSkills(req, res) {
  Skill.find().then(data => {
    res.status(200).json(data)
  }).catch(err => {
    res.status(404).json(err)
  })
}

function getSkillById(req, res) {
  Skill
    .findOne(myquery, function (err, result) {
      if (err) throw err;
      res.json(result);
    });
}

const addSkill = [isAuthenticated, (req, response)=>{
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
}]

const updateSkill = [isAuthenticated, (req, response)=> {

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

const deleteSkill = [isAuthenticated, (req, response)=>{

  let myquery = { _id: ObjectId(req.params.id) };
  Skill.deleteOne(myquery, function (err, obj) {
    if (err) throw err;
    response.json(obj);
  });
}]

module.exports = {getSkillsByTypes, getSkills, getSkillById, addSkill, updateSkill, deleteSkill}
