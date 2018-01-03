const mongoose = require('mongoose')
const pathIsRequired = '{PATH} is required.'
const User = require('./User')
const findAllOf = require('./../utils/findAllOf')

let commentSchema = new mongoose.Schema({
	authorName: {type: String, required: pathIsRequired},
	authorId: {type: mongoose.Schema.Types.ObjectId,  required: pathIsRequired, ref: 'User'},
	authorAvatar: {type: String, required: pathIsRequired},
	articleId: {type: String, required: pathIsRequired, ref: 'Article'},
	articleName: {type: String, required: pathIsRequired},
	commentBody: {type: String,  required: pathIsRequired},
	commentLikes: {type: Number, default: 0, max: 5000, min: -5000},
	createdAt: {type: String}
})

let Comment = mongoose.model('Comment', commentSchema)

module.exports = Comment

module.exports.addCommentUsers = (articleComments) => {
	return new Promise (
		function(resolve, reject) {
			if(articleComments.length < 1) {
				reject('No comments')
			}
		
			// get all commenters as objects in array
			let arr = findAllOf(articleComments, 'authorId')
			if(!arr) {
				reject(arr)
			}
			// find all commenters and take their avatars
			User.find({ $or: arr }).exec().then((users) => {

				let exp = []
				for(let i in users) {
					let ref = {
						userId: users[i]._id,
						avatar: users[i].avatar
					}
					exp.push(ref)
				}
				resolve(exp)
			})
		})
}



filterComments = (userComments, allComments) => {
	let arr = userComments.filter(function (e) {
		return allComments.indexOf(e) < 0
	})

	return arr
}


module.exports.removeComments = (commentObjects, articleComments) => {
	return new Promise(
		function(resolve, reject) {
			let commentAuthors = findAllOf(commentObjects, 'authorId')
			User.find({ $or: commentAuthors }).exec().then((users) => {
				for (i = 0, j = users.length; i < j; i++) {
					users[i].comments = filterComments(users[i].comments, articleComments)
					users[i].save()
				}
				resolve()
			})
		})
}