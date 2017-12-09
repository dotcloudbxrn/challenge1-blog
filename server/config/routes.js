const controllers = require('./../controllers/index')

module.exports = (app) => {
  app.get('/', controllers.home.index)
}