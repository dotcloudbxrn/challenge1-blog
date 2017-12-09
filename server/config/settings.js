const path = require('path')

module.exports =  {
  development: {
    rootDir: path.normalize(__dirname, '../..'),
    dbPath: 'mongodb://localhost:27017/Blog',
    port: 2525
  },
  staging: {},
  production: {},
}