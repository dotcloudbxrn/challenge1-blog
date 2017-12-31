const User = require("./../models/User")
const Article = require("./../models/Article")
const Comment = require("./../models/Comment")
const {ObjectId} = require("mongoose").Types
const moment = require("moment")
const avaUp = require("./../utils/avatarUpdate")

module.exports = {
	createArticleGet: (req, res) => {
		res.render("article/create")
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
				res.redirect("/")
			})
		})
	},
	listArticles: (req, res) => {
		let id = req.params.id
		User.findById(id).populate("articles").then((user) => {
			res.render("article/list", {user})
		})
	},
	detailsGet: (req, res) => {
		let articleId = req.params.id
		Article.findById(articleId)
			.populate("comments")
			.then((article) => {
				if (article.comments.length < 1) {
					res.render("article/details", article)
				} else {
					Comment.addCommentUsers(article.comments).then((results) => {
						// every place you find a comment by the users in results -> attach their image to the comment avatar
						for(let i = 0; i < article.comments.length; i++) {
							article.comments[i].authorAvatar = avaUp(results, "userId", article.comments[i].authorId)
						}
						res.render("article/details", article)
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
							createdAt: moment(timeStamp).format("DD/MM/YYYY h:mm a")
						}).then(() => {
							// I am aware that I should be doing this the other way around, 
							// I will do it
							res.redirect(`/article/details/${article._id}`)
						})
					)
				})
			)
		})
	}
}