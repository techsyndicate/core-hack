const mongoose = require('mongoose');
const reqString = { type: String, required: true, default: "" };

const dashDataSchema = mongoose.Schema({
    agencyName: reqString,
    registeredAgents: { // contains user's ids
        type: Array,
        required: true,
        default: []
    },
    id: reqString, // code of the agency
    admin: reqString // id of the admin of the agency
})

module.exports = mongoose.model("agency", dashDataSchema)