const controllers = require('./../controllers/index')
const auth = require('./auth')
const multer = require('multer')
const crypto = require('crypto')
const mime = require('mime')

let storage = multer.diskStorage({
  destination: function(req, file, cb) {
    cb(null, 'public/images/profile-pictures/')
  }, 
  filename: function(req, file, cb) {
    crypto.pseudoRandomBytes(16, function(err, raw) {
      cb(null, raw.toString('hex') + Date.now() + '.' + mime.getExtension(file.mimetype))
    })
  }
})

let upload = multer({ storage })

module.exports = (app) => {
  app.get('/', controllers.home.index)
  app.get('/user/register', controllers.user.registerGet)
  app.post('/user/register', controllers.user.registerPost)
  app.get('/user/login', controllers.user.loginGet)
  app.post('/user/login', controllers.user.loginPost)
  app.post('/user/logout', controllers.user.logout)
  app.get('/user/profile/:id', controllers.user.getProfile)
  app.get('/article/create', auth.isAuthenticated, controllers.article.createArticleGet)
  app.post('/article/create', auth.isAuthenticated, controllers.article.createArticlePost)
  app.get('/article/details/:id', controllers.article.detailsGet)
  app.get('/user/edit-profile/:id', auth.isAuthenticated, controllers.user.editProfileGet)
  app.post('/user/edit-profile/:id', auth.isAuthenticated, upload.single('avatar'), controllers.user.editProfilePost)
}