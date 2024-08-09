const { ensureAuthenticated } = require('../utils/authenticate')

const router = require('express').Router(),
    passport = require('passport'),
    User = require('../schemas/userSchema')

router.get('/', (req, res) => {
    // console.log(req.user)
    res.render('login', {title:'Login'})
})

router.post('/', passport.authenticate('local', {
    failureFlash: true,
    failureRedirect: '/login',
    successRedirect: '/'
}))

module.exports = router