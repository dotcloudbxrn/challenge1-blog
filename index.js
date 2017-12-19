const port = process.env.PORT || 2414
const env = process.env.NODE_ENV || 'development'
const express = require('express')
const settings = require('./server/config/settings')[env]

let app = express()
require('./server/config/express')(app)
require('./server/config/database')(settings)
require('./server/config/routes')(app)
require('./server/config/logger')(app)
require('./server/config/passport')()

app.listen(port)
console.log(`Server successfully started on port ${port}`)