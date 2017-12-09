const express = require('express')
const exphbs = require('express-handlebars')

module.exports = (app) => {
  app.set('view engine', 'handlebars')
  app.engine('handlebars', exphbs({defaultLayout: 'main'}))
  app.use(express.static('public'))
  console.log('Express Ready.')
}