const express = require('express')
const exphbs = require('express-handlebars')
const bodyParser = require('body-parser')
const session = require('express-session')
const passport = require('passport')
const hbsHelpers = require('./../utils/hbsHelpers')

module.exports = (app) => {
	app.set('view engine', 'handlebars')
	app.use(bodyParser.urlencoded({extended: true}))
	app.engine('handlebars', exphbs({
		defaultLayout: 'main',
		helpers: {
			truncTitle: hbsHelpers.truncTitle,
			truncBody: hbsHelpers.truncBody,
			possessive: hbsHelpers.possessive,
			isSameUser: hbsHelpers.isSameUser,
			checkOwnership: hbsHelpers.checkOwnership
		}
	}))

	app.use(session({ secret: 'superSecretStuff12345', resave: false, saveUninitialized: false }))
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