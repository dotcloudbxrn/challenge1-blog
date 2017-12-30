const mongoose = require('mongoose')
const pathIsRequired = '{PATH} is required.'

let commentSchema = new mongoose.Schema({
  authorName: {type: String, required: pathIsRequired},
  authorId: {type: String,  required: pathIsRequired},
  authorAvatar: {type: String, required: pathIsRequired},
  articleId: {type: String, required: pathIsRequired, ref: 'Article'},
  articleName: {type: String, required: pathIsRequired},
  commentBody: {type: String,  required: pathIsRequired},
  commentLikes: {type: Number, default: 0},
  createdAt: {type: String}
})

let Comment = mongoose.model('Comment', commentSchema)

module.exports = Comment