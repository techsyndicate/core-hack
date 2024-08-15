const mongoose = require('mongoose');
const reqString = { type: String, required: true, default: "" };

const dashDataSchema = mongoose.Schema({
    mission: {
        type: String,
        required: true,
        default: "Information not yet provided by agency. Please contact your agent and ask for a description of the mission."
    },
    junkInventory: {
        type: Array,
        required: true,
        default: []
    },
    todo: {
        type: Array,
        required: true,
        default: []
    },
    agency: reqString,
    userid: reqString
})

module.exports = mongoose.model("spaceguy", dashDataSchema)