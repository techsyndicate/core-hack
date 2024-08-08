const { ensurePlan, ensureAuthenticated } = require('../utils/authenticate')
const User = require('../schemas/userSchema')

const router = require('express').Router()

router.get('/',ensureAuthenticated, ensurePlan, async (req,res) => {
    res.render('spaceguy')
})

router.get('/tracker',ensureAuthenticated, ensurePlan, async (req, res) => {
    res.render('tracker')
})

router.get('/code', ensureAuthenticated,(req, res) => {
    res.render('spaceguyLogin')
})

router.post('/code', async (req,res) => {
    const code = req.body.code
    // console.log(code)
    const spaceguy = await User.findOne({userid: code})
    // console.log(spaceguy)
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

})

router.get('/clean', ensureAuthenticated, ensurePlan, (req,res)=>{
    res.render('junk')
})


router.get('/health', ensureAuthenticated, ensurePlan, (req, res)=>{
    res.render('health')
})

router.get('/friend', ensureAuthenticated, ensurePlan, async (req,res) => {
    res.render('ai')
})
module.exports = router