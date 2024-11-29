const mongoose = require("mongoose");
const Type = require("./Type");
const Schema = mongoose.Schema;

const SkillSchema = new Schema({
    type: {
        type: Schema.Types.ObjectId, ref: Type
    },
    name: String,
    level: String,
});

module.exports = mongoose.models.Skill || mongoose.model("Skill", SkillSchema);
