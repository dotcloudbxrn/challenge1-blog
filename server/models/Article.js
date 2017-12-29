const mongoose = require('mongoose')
const encryption = require('./../utils/encryption')
const pathIsRequired = '{PATH} is required.'
const User = require('./../models/User')

let articleSchema = new mongoose.Schema({
  authorName: {type: String, required: pathIsRequired},
  authorId: {type: String, required: pathIsRequired, ref: 'User'},
  title: {type: String, required: pathIsRequired, unique: true},
  bodyText: {type: String, required: pathIsRequired}
})

let Article = mongoose.model('Article', articleSchema)

module.exports = Article