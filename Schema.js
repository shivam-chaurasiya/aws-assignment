const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
    Firstname: String,
    Lastname: String,
    Email: String,
    password: Number
});

const User = mongoose.model('Employee', UserSchema);

module.exports = User;