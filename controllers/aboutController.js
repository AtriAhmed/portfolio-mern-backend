const dbConnect = require('../config/dbConnect');
const About = require("../models/About");
const { isAuthenticated } = require('../middlewares/isAuthenticated');
const ObjectId = require("mongodb").ObjectId;

async function getAbout(req, res) {
    await dbConnect();
    About.find().then(data => {
        res.status(200).json(data)
    }).catch(err => {
        res.status(404).json(err)
    })
}

async function getAboutById(req, res) {
    await dbConnect();
    let myquery = { _id: ObjectId(req.params.id) };
    About.findOne(myquery, function (err, result) {
        if (err) throw err;
        res.json(result);
    });
}

const addAbout = [isAuthenticated, async (req, response) => {
    await dbConnect();
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


const updateAbout = [isAuthenticated, async (req, response) => {
    await dbConnect();
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

const deleteAbout = [isAuthenticated, async (req, response) => {
    await dbConnect();
    let myquery = { _id: ObjectId(req.params.id) };
    About.deleteOne(myquery).then(res => {
        response.json(res);
    }).catch(err => {
        response.json(err)
    });
}]

module.exports = { getAbout, getAboutById, addAbout, updateAbout, deleteAbout };