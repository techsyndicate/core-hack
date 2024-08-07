const router = require('express').Router(),
    passport = require('passport'),
    User = require('../schemas/userSchema')

router.get('/', (req, res) => {
    console.log(req.user)
    res.render('login')
})

router.post('/', passport.authenticate('local', {
    failureFlash: true,
    failureRedirect: '/login',
    successRedirect: '/'
}))

router.get('/spaceguy', (req, res) => {
    res.render('spaceguyLogin')
})

router.post('/spaceguy', async (req,res) => {
    const code = req.body.code
    console.log(code)
    try{
        const spaceguy = await User.findOne({id: code})
        if(!spaceguy){
            return done(null, false, {message: 'No spaceguy with this code'})
        }
        return res.redirect('/spaceguy')
    } catch(e){
        return console.log(e)
    }
    
})
module.exports = router