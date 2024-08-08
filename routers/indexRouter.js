const router = require('express').Router()

router.get('/', async (req,res) => {
    res.render('index', {title:'welcome'})
})

module.exports = router