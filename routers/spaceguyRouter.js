const {ensureAuthenticated } = require('../utils/authenticate')
const User = require('../schemas/userSchema')
const spaceGuySchema = require('../schemas/spaceGuySchema')
const Agency = require('../schemas/agencySchema')

const router = require('express').Router()

router.get('/',ensureAuthenticated, async (req,res) => { 
    console.log(req.user)
    const spaceGuy = await spaceGuySchema.findOne({userid: req.user.id})
    console.log("this is spaceguy",spaceGuy)
    res.render('spaceguy', {user: req.user, spaceGuy: spaceGuy,title: "Spaceguy Dashboard"})
})

router.get('/tracker',ensureAuthenticated, async (req, res) => {
    res.render('tracker', {title: "Tracker"})
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
    res.render('health')
})


router.get('/food', ensureAuthenticated, async (req, res) => {
    res.render('food')
})

router.get('/sos', async (req,res) => {
    res.render('sos')
})
module.exports = router