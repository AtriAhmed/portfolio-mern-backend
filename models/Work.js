const mongoose = require('mongoose');

const WorkSchema = new mongoose.Schema({
    name: String,
    description: String,
    technologies: String,
    image: String,
    link: String,
    showInCV: Boolean
});

module.exports = mongoose.models.Work || mongoose.model("Work", WorkSchema, "work");