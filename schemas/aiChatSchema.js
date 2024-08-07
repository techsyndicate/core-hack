const mongoose = require('mongoose');
const reqString = { type: String, required: true };

const aiChatSchema = mongoose.Schema({
    email: reqString,
    userid: reqString,
    chats: {
        type: Array,
        required: true,
        default: []
    }
})

module.exports = mongoose.model("aiChat", aiChatSchema)