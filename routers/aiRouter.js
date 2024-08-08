const { ensureAuthenticated, ensurePlan } = require('../utils/authenticate')

const router = require('express').Router()
const aiChatSchema = require('../schemas/aiChatSchema');

router.get('/', async (req,res) => {
    const reqChat = await aiChatSchema.findOne({userid: req.user.id})
    if (!reqChat) {
        res.render('ai', {user: req.user, chats: ""})
    } else {
        console.log(reqChat.chats)
        res.render('ai', {user: req.user, chats: JSON.stringify(reqChat.chats)})
    }
})


router.post('/storeChat', async (req,res) => {
    console.log(req.body)
    const { response, query } = req.body


    console.log(response, query)
    const reqChat = await aiChatSchema.findOne({userid: req.user.id})
    if (reqChat) {
        var prevChats = reqChat.chats
        prevChats.push([response, query])
        await aiChatSchema.updateOne({userid: req.user.id}, {
            $set: {
                chats: prevChats
            }
        })
        return res.send({success: true, message: "Chat stored successfully."})
    } else {
        const newChat = new aiChatSchema({
            email: req.user.email,
            userid: req.user.id,
            chats: [[response, query]]
        })
        await newChat.save()
        return res.send({success: true, message: "Chat stored successfully."})
    }
})

module.exports = router