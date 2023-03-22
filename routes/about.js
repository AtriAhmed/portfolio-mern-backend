const express = require("express");

// recordRoutes is an instance of the express router.
// We use it to define our routes.
// The router will be added as a middleware and will take control of requests starting with path /record.
const recordRoutes = express.Router();

const connection = require('../config/connection');
const About = connection.models.About;

// This help convert the id from string to ObjectId for the _id.
const ObjectId = require("mongodb").ObjectId;


// This section will help you get a list of all the records.
recordRoutes.route("/get-about").get(function (req, res) {
    About.find().then(data => {
        res.status(200).json(data)
    }).catch(err => {
        res.status(404).json(err)
    })
});

// This section will help you get a single record by id
recordRoutes.route("/get-about/:id").get(function (req, res) {

    let myquery = { _id: ObjectId(req.params.id) };
    About
        .findOne(myquery, function (err, result) {
            if (err) throw err;
            res.json(result);
        });
});

// This section will help you create a new record.
recordRoutes.route("/add-about").post(function (req, response) {

    let myobj = {
        title: req.body.title,
        content: req.body.content
    };
    About.create(myobj).then(res => {
        response.json(res);
    }).catch(err => {
        response.json(err)
    })
});

// This section will help you update a record by id.
recordRoutes.route("/update-about/:id").put(function (req, response) {
    let myquery = { _id: ObjectId(req.params.id) };
    let newvalues = {
        $set: {
            title: req.body.title,
            content: req.body.content
        },
    };
    About
        .updateOne(myquery, newvalues).then((res) => {
            response.json(res);
        }).catch(err => {
            response.json(err)
        })
});

// This section will help you delete a record
recordRoutes.route("/delete-about/:id").delete((req, response) => {
    let myquery = { _id: ObjectId(req.params.id) };
    About.deleteOne(myquery).then(res => {
        response.json(res);
    }).catch(err => {
        response.json(err)
    });
});

module.exports = recordRoutes;
