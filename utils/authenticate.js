const passport = require('passport')

function ensureAuthenticated(req, res, next) {
    if (req.isAuthenticated()) {
      return next();
    }
    else res.redirect('/login');
  }

function forwardAuthenticated(req, res, next) {
    if (!req.isAuthenticated()) {
      return next();
    }
    else{
      res.redirect('/')
    } 
  }

function ensurePlan(req, res, next) {
  console.log(req.user)
  if (req.user.hasPlan) {
    return next();
  }
  else{
    res.redirect('/agency')
  } 
}

function ensureNoPlan(req, res, next) {
  console.log(req.user)
  if (!req.user.hasPlan) {
    return next();
  }
  else{
    res.redirect('/spaceguy')
  } 
}

module.exports = { ensureAuthenticated, forwardAuthenticated, ensurePlan, ensureNoPlan};