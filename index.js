const port = 8000
const express = require('express')
let app = express()

app.get('/', (req, res) => {
  res.send('Hiiii')
  res.end()
})

app.get('*', (req, res) => {
  res.sendStatus(404)
  res.end()
})

app.listen(port)
console.log(`Started app on port ${port}`)