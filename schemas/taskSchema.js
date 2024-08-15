const mongoose = require('mongoose');
const reqString = { type: String, required: true };

const taskSchema = mongoose.Schema({
    task: reqString,
    status:{
        type: Boolean,
        default: false,
        required: true
    },
    taskId: reqString,
})

module.exports = mongoose.model("Task", taskSchema)