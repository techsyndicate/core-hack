const router = require('express').Router()
const {ensureAuthenticated} = require('../utils/authenticate.js')
const stripe = require('stripe')(process.env.STRIPE_KEY)
const User = require('../schemas/userSchema')

router.get('/', ensureAuthenticated, async (req,res) => {
    const userdata=req.user
    console.log(userdata)
    res.render('agency',{userdata:userdata})
})

router.post('/buy', ensureAuthenticated, async (req, res) => {
    const session = await stripe.checkout.sessions.create({
        payment_method_types: ["card"],
        line_items: [{
            price_data: {
                currency: "inr",
                product_data: {
                    name: 'buy for spaceguy 💗💗',
                },
            unit_amount: 300000,
        },
        quantity: 1,
        }],
        mode: 'payment',
        success_url: 'http://localhost:5000/agency/success',
        cancel_url: 'http://localhost:5000/agency/cancel',
      });
      res.redirect(303, session.url);
      await User.findOneAndUpdate({email: req.user.email}, {
          $set: {
              hasPlan: true,
              planDate: Date.now()
          }
      })
})


router.get('/cancel',ensureAuthenticated,(req, res) => {
    res.render('cancel')
});

router.get('/success',ensureAuthenticated, (req, res) => {
    const userdata=req.user
    console.log(userdata)
    res.render('success',{userdata:userdata})
});

module.exports = router