const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const user_schema = Schema({
    _id: { type: String, default: mongoose.Types.ObjectId },
    firstname: { type: String, required: true },
    lastname: { type: String, required: true },
    password: { type: String, required: true },
    email: { type: String, required: true },
    image: { type: String },
    gender: { type: String, required: true }
});

module.exports = mongoose.model("users", user_schema);