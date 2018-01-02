const mongoose = require('mongoose')
const pathIsRequired = '{PATH} is required.'
const User = require('./User')
const findAllOf = require('./../utils/findAllOf')

let articleSchema = new mongoose.Schema({
	authorName: {type: String, required: pathIsRequired},
	authorId: {type: mongoose.Schema.Types.ObjectId, required: pathIsRequired, ref: 'User'},
	title: {type: String, required: pathIsRequired, unique: true},
	bodyText: {type: String, required: pathIsRequired},
	comments: [{type: mongoose.Schema.Types.ObjectId, ref: 'Comment'}]
})

let Article = mongoose.model('Article', articleSchema)
module.exports = Article


filterArticles = (articles, articleId) => {
	let arr = userComments.filter(function (e) {
		return allComments.indexOf(e) < 0
	})

	return arr
}


module.exports.removeFromUserList = (authorId, articleId) => {
	return new Promise(
		function(resolve, reject) {
			User.findById(authorId).then((user) => {
				user.articles = user.articles.filter((e) => {
					return e.toString() != articleId.toString()
				})

				user.save().then(() => {
					resolve()
				})
			})
		}
	)
}