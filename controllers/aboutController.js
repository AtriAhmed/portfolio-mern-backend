const connection = require('../config/connection');
const  {isAuthenticated} = require('../middlewares/isAuthenticated');
const About = connection.models.About;
const ObjectId = require("mongodb").ObjectId;

function getAbout(req, res){
        About.find().then(data => {
            res.status(200).json(data)
        }).catch(err => {
            res.status(404).json(err)
        })
}

function getAboutById(req, res){
        let myquery = { _id: ObjectId(req.params.id) };
        About.findOne(myquery, function (err, result) {
                if (err) throw err;
                res.json(result);
            });
}

const addAbout = [isAuthenticated,(req, response)=>{ 
        let myobj = {
            title: req.body.title,
            content: req.body.content
        };
        About.create(myobj).then(res => {
            response.json(res);
        }).catch(err => {
            response.json(err)
        })
}]


const updateAbout=  [isAuthenticated, (req, response)=> {
    let myquery = { _id: ObjectId(req.params.id) };
    let newvalues = {
        $set: {
            title: req.body.title,
            content: req.body.content
        },
    };
    About.updateOne(myquery, newvalues).then((res) => {
        response.json(res);
    }).catch(err => {
        response.json(err)
    })
}]

const deleteAbout = [isAuthenticated, (req, response) =>{
    let myquery = { _id: ObjectId(req.params.id) };
    About.deleteOne(myquery).then(res => {
        response.json(res);
    }).catch(err => {
        response.json(err)
    });
}]

module.exports = {getAbout, getAboutById, addAbout, updateAbout, deleteAbout};