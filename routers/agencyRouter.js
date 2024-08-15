const router = require('express').Router()
const {ensureAuthenticated} = require('../utils/authenticate.js')
const stripe = require('stripe')(process.env.STRIPE_KEY)
const User = require('../schemas/userSchema')
const Agency = require('../schemas/agencySchema.js')
const Spaceguy = require('../schemas/spaceGuySchema.js')
const { v4: uuidv4 } = require('uuid');

router.get('/', ensureAuthenticated, async (req,res) => {
    const userdata=req.user
    const reqAgency = await Agency.findOne({admin: userdata.id})

    const reqSpaceguy = await Spaceguy.findOne({userid: userdata.id})
    
    if (reqSpaceguy) {
        return res.redirect('/spaceguy')
    }

    res.render('agency',{userdata:userdata, reqAgency: reqAgency,user:req.user})
})

router.post('/buy', ensureAuthenticated, async (req, res) => {
    const domain = process.env.DOMAIN;
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
        // success_url: `${domain}/agency/success`,
        // cancel_url: `${domain}/agency/cancel`,
        success_url: `http://localhost:5000/agency/success`,
        cancel_url: `http://localhost:5000/agency/cancel`,
      });

      const id = uuidv4()
      await User.findOneAndUpdate({email: req.user.email}, {
          $set: {
              isSpaceguy: false
            }
        })
        const newAgency = new Agency({
            agencyName: "Core",
            id: id,
            admin: req.user.id
        })
        await newAgency.save()
    res.redirect(303, session.url);
    
})


router.get('/cancel',ensureAuthenticated,(req, res) => {
    res.render('cancel',{user:req.user})
});

router.get('/success',ensureAuthenticated, (req, res) => {
    const userdata=req.user
    // console.log(userdata)
    res.render('success',{userdata:userdata})
});

module.exports = router