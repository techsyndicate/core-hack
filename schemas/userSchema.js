const mongoose = require('mongoose');
const reqString = { type: String, required: true };

const userSchema = mongoose.Schema({
    fname: reqString,
    lname: reqString,
    email: reqString,
    password: reqString,
    isSpaceguy: {
        type: Boolean,
        default: true,
        required: true
    }
})

module.exports = mongoose.model("User", userSchema)