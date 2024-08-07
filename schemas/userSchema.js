const mongoose = require('mongoose');
const reqString = { type: String, required: true };

const userSchema = mongoose.Schema({
    fname: reqString,
    lname: reqString,
    email: reqString,
    password: reqString,
    userid: reqString,
    hasPlan: {type: Boolean, default: false},
    planDate: {type:Date, required: false, default: null}
})

module.exports = mongoose.model("User", userSchema)