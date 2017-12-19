const encryption = require('./../utils/encryption')
const User = require('../models/User')

module.exports = {
  registerGet: (req, res) => {
    res.render('user/register')
  },

  registerPost: (req, res) => {
    let reqUser = req.body
    // add validation maybe
      if(!reqUser.username || !reqUser.password || !reqUser.firstName || !reqUser.lastName) {
        res.locals.globalError = 'Invalid User Data'
        res.render('user/register')
        return
      }
    let salt = encryption.generateSalt()
    let hashedPassword = encryption.generateHashedPassword(salt, reqUser.password)
    User.create({
      // I'm aware it's horrible to use toLowerCase for the username, but the fontface I chose 
      // doesn't differentiate between capital and lowercase characters, so...
      username: reqUser.username.toLowerCase(),
      firstName: reqUser.firstName,
      lastName: reqUser.lastName,
      salt: salt,
      hashedPass: hashedPassword
    }).then((user) => {
      req.logIn(user, (err, user) => {
        if (err) {
          res.locals.globalError = err
          res.render('user/register', user) 
        }
        res.redirect('/')
      })
    })
  },

  logout: (req, res) =>  {
    req.logout()
    res.redirect('/')
  },

  loginGet: (req, res) => {
    res.render('user/login')
  },

  loginPost: (req, res) => {
    let reqUser = req.body
    User.findOne({username:reqUser.username.toLowerCase()}).then((user) => {
      if (!user) {
        res.locals.globalError = 'Invalid user data'
        res.render('user/login')
        return
      }
      if (!user.authenticate(reqUser.password)) {
        res.locals.globalError = 'Invalid user data'
        res.render('user/login')
        return
      }
      req.logIn(user, (err, user) => {
        if (err) {
          res.locals.globalError = err
          res.render('user/login')
          return
        }
        res.redirect('/')
      })
    }).catch((err) => {
      console.log(err)
    })
  }
}