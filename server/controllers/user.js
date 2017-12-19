const encryption = require('./../utils/encryption')
const User = require('../models/User')

module.exports = {
  registerGet: (req, res) => {
    res.render('user/register')
  },

  registerPost: (req, res) => {
    let reqUser = req.body
    // add validation maybe
    let salt = encryption.generateSalt()
    let hashedPassword = encryption.generateHashedPassword(salt, reqUser.password)
    User.create({
      username: reqUser.username,
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
    User.findOne({username:reqUser.username}).then((user) => {
      if (!user) {
        res.locals.globalError = 'Invalid user data'
        res.render('user/login')
        return
      }
      if (!user.authenticate(reqUser.password)) {
        res.locals.globalError = 'Invaliiiiid user data'
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