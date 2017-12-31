const mongoose = require("mongoose")
const pathIsRequired = "{PATH} is required."
const User = require("./User")

let commentSchema = new mongoose.Schema({
	authorName: {type: String, required: pathIsRequired},
	authorId: {type: String,  required: pathIsRequired, ref: "User"},
	authorAvatar: {type: String, required: pathIsRequired},
	articleId: {type: String, required: pathIsRequired, ref: "Article"},
	articleName: {type: String, required: pathIsRequired},
	commentBody: {type: String,  required: pathIsRequired},
	commentLikes: {type: Number, default: 0},
	createdAt: {type: String}
})

let Comment = mongoose.model("Comment", commentSchema)

module.exports = Comment
module.exports.addCommentUsers = (articleComments) => {
	return new Promise (
		function(resolve, reject) {
			if(articleComments.length < 1) {
				reject("No comments")
			}
		
			function findAuthors (arr) {
				let prop = "authorId"
				let obj = {}
				let nested = []

				for (var i in arr) {
					if(obj[arr[i][prop]] == undefined) {
						nested.push(arr[i])
						obj[arr[i][prop]] = "init"
					}
				}
    
				let final = []
				for(let i in nested) {
					let obj = {}
					obj.authorId = nested[i].authorId
					final.push(obj)
				}
				return final
			}

			// get all commenters as objects in array
			let arr = findAuthors(articleComments)

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