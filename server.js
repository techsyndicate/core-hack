require('dotenv').config()

const express = require('express'),
    mongoose = require('mongoose'),
    passport = require('passport'),
    session = require('express-session'),
    flash = require('express-flash'),
    app = express(),
    passportInit = require('./utils/passport-config'),
    { ensureAuthenticated, forwardAuthenticated } = require('./utils/authenticate'),
    PORT = process.env.PORT || 5000,
    bodyParser = require('body-parser')
    engine = require('ejs-blocks');

const indexRouter = require('./routers/indexRouter'),
      loginRouter = require('./routers/loginRouter'),
      regRouter = require('./routers/regRouter'),
      spaceguyRouter = require('./routers/spaceguyRouter'),
      aiRouter = require('./routers/aiRouter'),
      agencyRouter = require('./routers/agencyRouter'),
      sosRouter = require('./routers/sosRouter');


app.use(express.static('public'))
app.engine('ejs', engine)
app.set('view engine', 'ejs')
app.use(express.json())
app.use(express.urlencoded({extended: false}))
app.use(bodyParser.urlencoded({ extended: true }));
passportInit(passport)
app.use(flash())
app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: true,
    saveUninitialized: true
}))
app.use(passport.initialize())
app.use(passport.session())


mongoose.connect(process.env.MONGO_URI, console.log('MONGODB CONNECTED'))

app.use('/', indexRouter)
app.use('/login', forwardAuthenticated, loginRouter)
app.use('/register', forwardAuthenticated, regRouter)
app.use('/spaceguy', ensureAuthenticated, spaceguyRouter)
app.use('/spaceguy/ai', ensureAuthenticated, aiRouter)
app.use('/agency', ensureAuthenticated, agencyRouter)
app.use('/spaceguy/sos', ensureAuthenticated, sosRouter)


app.get('/logout', (req, res) => {
    req.logout((err) => {
        if (err) console.log(err)
        return res.redirect('/login')
    });
})

app.listen(PORT, console.log(`Server listening on port ${PORT}`))