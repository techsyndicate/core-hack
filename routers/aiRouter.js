const router = require('express').Router()

router.get('/', async (req,res) => {
    res.render('ai')
})

module.exports = router