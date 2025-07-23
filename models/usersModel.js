const mongoose = require("mongoose");

const Users = mongoose.model("Users", {
    number: Number,
    password: String,
});

module.exports = Users;