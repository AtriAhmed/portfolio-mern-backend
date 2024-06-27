const mongoose = require("mongoose");

const ContactSchema = new mongoose.Schema({
    name: String,
    lastname: String,
    title: String,
    email: String,
    phone: String,
    location: String,
    github: String,
    linkedin: String,
    website: String
});

module.exports = mongoose.models.Contact || mongoose.model("Contact", ContactSchema, "contact");