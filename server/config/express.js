const express = require('express')
const exphbs = require('express-handlebars')
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const session = require('express-session')
const passport = require('passport')

module.exports = (app) => {
  app.engine('handlebars', exphbs({defaultLayout: 'main'}))
  app.set('view engine', 'handlebars')
  app.use(bodyParser.urlencoded({extended: true}))
  app.use(cookieParser())
  app.use(session({ secret: "superSecretStuff12345", resave: false, saveUninitialized: false }))
  app.use(passport.initialize())
  app.use(passport.session())
  app.use((req, res, next) => {
    if(req.user) {
      res.locals.currentUser = req.user
    }
    next()
  })
  app.use(express.static('public'))
  console.log('Express Ready.')
}