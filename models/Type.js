const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const TypeSchema = new Schema({
    name: String,
});

module.exports = mongoose.models.Type || mongoose.model("Type", TypeSchema);
