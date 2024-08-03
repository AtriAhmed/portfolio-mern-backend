const mongoose = require('mongoose');

const ExperienceSchema = new mongoose.Schema({
    name: String,
    position: String,
    date: String,
    description: String,
    image: String,
    showInCV: Boolean
});

module.exports = mongoose.models.Experience || mongoose.model("Experience", ExperienceSchema, "experience");