const connection = require('../config/connection');
const { isAuthenticated } = require('../middlewares/isAuthenticated');
const Contact = connection.models.Contact;

// This help convert the id from string to ObjectId for the _id.
const ObjectId = require("mongodb").ObjectId;

function getContact(req, res){
    Contact.findOne({}).then(data => {
        res.status(200).json(data)
    }).catch(err => {
        res.status(404).json(err)
    })
}

const addContact = [isAuthenticated,(req, response) => {
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
}]

const updateController = [isAuthenticated,(req, response)=> {
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
    
    Contact.updateOne(myquery, newvalues).then((res) => {
            response.json(res);
        }).catch(err => {
            response.json(err)
        })
}]

module.exports = {getContact, addContact, updateController}