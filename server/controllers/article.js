const User = require('./../models/User')
const Article = require('./../models/Article')
const Comment = require('./../models/Comment')
const {ObjectId} = require('mongoose').Types
const moment = require('moment')
const avaUp = require('./../utils/avatarUpdate')
const findAllOf = require('./../utils/findAllOf')

module.exports = {
	createArticleGet: (req, res) => {
		res.render('article/create')
	},
	createArticlePost: (req, res) => {
		let article = req.body
		let userId = res.locals.currentUser._id
		User.findById(userId).then((author) => {
			let articleId = new ObjectId()
			article.authorName = author.username
			article.authorId = author._id
			article._id = articleId
			author.articles.push(articleId)
			author.save()
			Article.create(article).then(() => {
				res.redirect('/')
			})
		})
	},
	listArticles: (req, res) => {
		let id = req.params.id
		User.findById(id).populate('articles').then((user) => {
			res.render('article/list', {user})
		})
	},
	detailsGet: (req, res) => {
		let articleId = req.params.id
		Article.findById(articleId)
			.populate('comments')
			.then((article) => {
				if (article.comments.length < 1) {
					res.render('article/details', article)
				} else {
					Comment.addCommentUsers(article.comments).then((results) => {
						// every time you find a comment by the user, attach their image to the comment avatar
						for(let i = 0, j = article.comments.length; i < j; i++) {
							article.comments[i].authorAvatar = avaUp(results, 'userId', article.comments[i].authorId.toString())
						}
						res.render('article/details', article)
					})
				}
			})
	},
	addComment: (req, res) => {
		let commentId = new ObjectId()
		let id = req.params.userId
		let articleId = req.params.articleId
		let timeStamp = moment().valueOf()
		User.findById(id).then((user) => {
			user.comments.push(commentId)
			user.save().then(
				Article.findById(articleId).then((article) => {
					article.comments.push(commentId)
					article.save().then(
						Comment.create({
							_id: commentId,
							authorName: user.username,
							authorId: user._id,
							authorAvatar: user.avatar,
							articleId: article._id,
							articleName: article.title,
							commentBody: req.body.commentBody,
							createdAt: moment(timeStamp).format('DD/MM/YYYY h:mm a')
						}).then(() => {
							// I am aware that I should be doing this the other way around, 
							// I will do it
							res.redirect(`/article/details/${article._id}`)
						})
					)
				})
			)
		})
	},
	editGet: (req, res) => {
		let id = req.params.id
		Article.findById(id).then((article) => {
			if (!article) {
				console.error('Could not find article.')
				res.redirect('/')
				return
			}
			res.render('article/edit', article)
		})
	},
	editPost: (req, res) => {
		let articleId = req.params.id
		Article.findByIdAndUpdate(articleId).then((article) => {
			article.title = req.body.title
			article.bodyText = req.body.bodyText
			article.save().then(() => {
				res.redirect(`/article/details/${article._id}`)
			})
		})
	},
	deleteGet: (req, res) => {
		let id = req.params.id
		Article.findById(id).then((article) => {
			res.render('article/delete', article)
		})
	},
	deletePost: (req, res) => {
		let articleId = req.params.id
		Article.findById(articleId).then((article) => {
			Comment.find({ '_id' : { $in: article.comments}}).exec().then((commentObjects) => {
				if (commentObjects.length < 1) {
					// napravi go tuk sushto
					Article.removeFromUserList(article.authorId, article._id).then(
						Article.findByIdAndRemove(articleId).then(() => {
							res.redirect(`/?success=${encodeURIComponent('Post B-Gone!')}`)
						})
					)
				} else {
					Article.removeFromUserList(article.authorId, article._id).then(() => {
						Comment.removeComments(commentObjects, article.comments).then(() => {
							Article.findByIdAndRemove(articleId).then(() => {
								Comment.remove({ '_id' : { $in: article.comments}}).exec().then(() => {
									res.redirect(`/?success=${encodeURIComponent('Post B-Gone!')}`)
								})
							})
						})
					})
				}
			})
		})
	}
}