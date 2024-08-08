const { ensurePlan, ensureAuthenticated } = require('../utils/authenticate')
const User = require('../schemas/userSchema')

const router = require('express').Router()

router.get('/',ensureAuthenticated, ensurePlan, async (req,res) => { 
    console.log(req.user)
    res.render('spaceguy', {user: req.user})
})

router.get('/tracker',ensureAuthenticated, ensurePlan, async (req, res) => {
    res.render('tracker')
})

router.get('/code', ensureAuthenticated,(req, res) => {
    res.render('spaceguyLogin')
})

router.post('/code', async (req,res) => {
    const code = req.body.code
    const spaceguy = await User.findOne({userid: code})
    if(!spaceguy){
        return ('No spaceguy with this code');
    }
    if(spaceguy){
        await User.findOneAndUpdate({email: req.user.email}, {
            $set: {
                hasPlan: true
            }
        })
    }
    return res.redirect('/spaceguy')
    
})

router.post('/emergency', ensureAuthenticated, ensurePlan, (req,res)=>{
res.send('woah bbg you in troubleeee')
})

router.get('/clean', ensureAuthenticated, ensurePlan, (req,res)=>{
    res.render('junk')
})

router.post('/clean', ensureAuthenticated, ensurePlan, (req, res)=>{
    console.log(req.body.junklist)
    res.redirect('/')
})


router.get('/health', ensureAuthenticated, ensurePlan, (req, res)=>{
    res.render('health')
})

router.get('/friend', ensureAuthenticated, ensurePlan, async (req,res) => {
    res.render('ai')
})

router.get('/food', ensureAuthenticated, ensurePlan, async (req, res) => {
    res.render('food')
})
module.exports = router