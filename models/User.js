const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    username: String,
    password: String
});

module.exports = mongoose.models.User || mongoose.model("User", UserSchema);
