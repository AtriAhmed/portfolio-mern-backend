const uuidv4 = require("uuid").v4;

const connection = require('../config/connection');
const Work = connection.models.Work;

// This help convert the id from string to ObjectId for the _id.
const ObjectId = require("mongodb").ObjectId;
const path = require("path");
const { removeSpaces } = require("../middlewares/removeSpaces");
const { isAuthenticated } = require("../middlewares/isAuthenticated");

function getWork(req, res) {
    Work
      .find().then(data => {
        res.status(200).json(data)
      }).catch(err => {
        res.status(404).json(err)
      })
}

function getWorkById (req, res) {
    let myquery = { _id: ObjectId(req.params.id) };
    Work
      .findOne(myquery, function (err, result) {
        if (err) throw err;
        res.json(result);
      });
  }

  const addWork = [removeSpaces, (req, response)=> {

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
      }
  ]

  const updateWork = [ isAuthenticated, removeSpaces, async (req, response)=> {

    const oldWork = await Work.findOne({ _id: ObjectId(req.params.id) });
  
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
    let newvalues = {
      $set: {
        name: req.body.name,
        description: req.body.description,
        technologies: req.body.technologies,
        image: image ? image : oldWork.image,
        link: req.body.link
      },
    };
    Work
      .updateOne(myquery, newvalues).then((res) => {
        response.json(res);
      }).catch(err => {
        response.json(err)
      })
  }]

const deleteWork = [isAuthenticated, (req, response)=>{
    let myquery = { _id: ObjectId(req.params.id) };
    Work.deleteOne(myquery, function (err, obj) {
      if (err) throw err;
      response.json(obj);
    });
  }]

module.exports = {getWork, getWorkById, addWork, updateWork, deleteWork}