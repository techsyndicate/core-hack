const router = require('express').Router()
const User = require('../schemas/userSchema')
const bcrypt = require('bcrypt')
const { v4: uuidv4 } = require('uuid');


router.get('/', (req, res) => {
    res.render('register', {error: false})
})

router.post('/', async (req, res) => {
     const {email, password, fname, lname, cnfpassword} = req.body
     const foundUser = await User.findOne({email})
     if (!email || !password || !fname || !lname || !cnfpassword) {
        return res.render('register', {error: "Please enter all the credentials."})
     }
     if (password != cnfpassword) {
        return res.render('register', {error: "The passwords do not match!"})
     }
     if (foundUser) {
        return res.render('register', {error: "A user with this username already exists. Please enter a unique username."})
     }
     const id = uuidv4()
     const newUser = new User({
        email: email,
        fname: fname,
        lname: lname,
        password: await bcrypt.hash(password, 10),
        userid: id
     })
     await newUser.save()
     console.log(id)
     res.redirect('/login')
})

module.exports = router