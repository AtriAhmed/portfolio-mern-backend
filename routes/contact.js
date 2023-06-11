const express = require("express");

// recordRoutes is an instance of the express router.
// We use it to define our routes.
// The router will be added as a middleware and will take control of requests starting with path /record.
const recordRoutes = express.Router();

const connection = require('../config/connection');
const Contact = connection.models.Contact;

// This help convert the id from string to ObjectId for the _id.
const ObjectId = require("mongodb").ObjectId;


// This section will help you get a list of all the records.
recordRoutes.route("/get-contact").get(function (req, res) {
    Contact.findOne({}).then(data => {
        res.status(200).json(data)
    }).catch(err => {
        res.status(404).json(err)
    })
});


// This section will help you create a new record.
recordRoutes.route("/add-contact").post(function (req, response) {
    let myobj = {
        name: req.body.name,
        lastname: req.body.lastname,
        title: req.body.title,
        email: req.body.email,
        phone: req.body.phone,
        location: req.body.location,
    };

    Contact.create(myobj).then(res => {
        response.json(res);
    }).catch(err => {
        response.json(err)
    })
});

// This section will help you update a record by id.
recordRoutes.route("/update-contact/:id").put(function (req, response) {
    let myquery = { _id: ObjectId(req.params.id) };
    let newvalues = {
        $set: {
            name: req.body.name,
            lastname: req.body.lastname,
            title: req.body.title,
            email: req.body.email,
            phone: req.body.phone,
            location: req.body.location,
        },
    };
    Contact
        .updateOne(myquery, newvalues).then((res) => {
            response.json(res);
        }).catch(err => {
            response.json(err)
        })
});

module.exports = recordRoutes;
