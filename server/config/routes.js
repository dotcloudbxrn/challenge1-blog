const controllers = require('./../controllers/index')
const auth = require('./auth')

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
  app.get('/user/edit-profile/:id', controllers.user.editProfileGet)
}