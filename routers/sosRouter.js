const router = require('express').Router()

router.get('/', async (req,res) => {
    res.render('sos')
})

module.exports = router