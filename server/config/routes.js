const controllers = require('./../controllers/index')

module.exports = (app) => {
  app.get('/', controllers.home.index)
  app.get('/user/register', controllers.user.registerGet)
}