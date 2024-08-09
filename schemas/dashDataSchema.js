const mongoose = require('mongoose');
const reqString = { type: String, required: true, default: "" };

const dashDataSchema = mongoose.Schema({
    mission: "Information not yet provided by agency. Please contact your agent and ask for a description of the mission.",
    junkInventory: reqString
    
})

module.exports = mongoose.model("dashData", dashDataSchema)