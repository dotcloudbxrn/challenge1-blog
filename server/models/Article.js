const mongoose = require('mongoose')
const encryption = require('./../utils/encryption')
const pathIsRequired = '{PATH} is required.'

let articleSchema = new mongoose.Schema({
  author: {type: String, required: pathIsRequired},
  title: {type: String, required: pathIsRequired, unique: true},
  bodyText: {type: String, required: pathIsRequired}
})

let Article = mongoose.model('Article', articleSchema)

module.exports = Article