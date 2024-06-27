const mongoose = require("mongoose");

const EducationSchema = new mongoose.Schema({
    certificate: String,
    institute: String,
    date: String,
    location: String,
});

module.exports = mongoose.models.Education || mongoose.model("Education", EducationSchema, "education");