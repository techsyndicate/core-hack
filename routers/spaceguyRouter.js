const {ensureAuthenticated } = require('../utils/authenticate')
const User = require('../schemas/userSchema')
const spaceGuySchema = require('../schemas/spaceGuySchema')
const Agency = require('../schemas/agencySchema')

const router = require('express').Router()

router.get('/',ensureAuthenticated, async (req,res) => { 
    console.log(req.user)
    const spaceGuy = await spaceGuySchema.findOne({userid: req.user.id})
    console.log("this is spaceguy",spaceGuy)
    res.render('spaceguy', {user: req.user, spaceGuy: spaceGuy,title: "Spaceguy Dashboard",user:req.user})
})

router.get('/tracker',ensureAuthenticated, async (req, res) => {
    res.render('tracker', {title: "Tracker",user:req.user})
})

router.post('/code', async (req,res) => {
    const code = req.body.code
    const agency = await Agency.findOne({id: code})
    if(!agency){
        return ('No spaceguy with this code');
    }
    if(agency){
        const newSpaceGuy = new spaceGuySchema({
            agency: agency.agencyName,
            userid: req.user.id
        })
        await newSpaceGuy.save()

        let allAgents = agency.registeredAgents
        allAgents.push(req.user.email)

        await Agency.findOneAndUpdate({id: code}, {
            $set: {
                registeredAgents: allAgents
            }
        })
    }
    return res.redirect('/spaceguy')
    
})


router.get('/clean', ensureAuthenticated, (req,res)=>{
    res.render('junk')
})

router.post('/clean', ensureAuthenticated, (req, res)=>{
    console.log(req.body.junklist)
    res.redirect('/spaceguy')
})


router.get('/health', ensureAuthenticated, (req, res)=>{
    res.render('health',{user:req.user})
})


router.get('/food', ensureAuthenticated, async (req, res) => {
    res.render('food',{user:req.user})
})

router.get('/sos', async (req,res) => {
    res.render('sos')
})

router.get('/todo', ensureAuthenticated, async (req, res) => {  
    // const tasks = await Task.find({});

    const reqSpaceGuy = await spaceGuySchema.findOne({userid: req.user.id})

    res.render('todo',{user:req.user, spaceguy:reqSpaceGuy})
    
})

router.post('/todo/:task', ensureAuthenticated, async (req, res) => {
    const { task } = req.params;

    const reqSpaceGuy = await spaceGuySchema.findOne({userid: req.user.id})

    let oldTodos = reqSpaceGuy.todo

    oldTodos["pending"].pop(task)
    oldTodos["completed"].push(task)


    try {
        await spaceGuySchema.findOneAndUpdate({userid: req.user.id}, {
            $set: {
                todo: oldTodos
            }
        })
        return res.send("Task successfully marked as completed")
    } catch (error) {
        console.log(error)
        return res.send("There was an error please try again")
    }
})
module.exports = router