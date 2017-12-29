const controllers = require('./../controllers/index')
const auth = require('./auth')
const multer = require('multer')
let storage = require('./multerStorage')

let upload = multer(storage )

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
  app.get('/article/list/:id', controllers.article.listArticles),
  app.post('/article/postComment/:articleId/:userId', auth.isAuthenticated,controllers.article.addComment)
}