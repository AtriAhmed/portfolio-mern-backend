const dbConnect = require('../config/dbConnect');
const { isAuthenticated } = require('../middlewares/isAuthenticated');
const Education = require("../models/Education");

// This help convert the id from string to ObjectId for the _id.
const ObjectId = require("mongodb").ObjectId;

async function getEducation(req, res) {
    await dbConnect();
    Education.findOne({}).then(data => {
        res.status(200).json(data)
    }).catch(err => {
        res.status(404).json(err)
    })
}

const addEducation = [isAuthenticated, async (req, response) => {
    await dbConnect();
    let myobj = {
        ...req.body
    };

    Education.create(myobj).then(res => {
        response.json(res);
    }).catch(err => {
        response.json(err)
    })
}]

const updateController = [isAuthenticated, async (req, response) => {
    await dbConnect();
    let myquery = { _id: ObjectId(req.params.id) };
    let newvalues = {
        $set: {
            ...req.body
        },
    };

    Education.updateOne(myquery, newvalues).then((res) => {
        response.json(res);
    }).catch(err => {
        response.json(err)
    })
}]

module.exports = { getEducation, addEducation, updateController }