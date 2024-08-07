const router = require('express').Router()

router.get('/', async (req,res) => {
    res.render('spaceguy')
})

module.exports = router