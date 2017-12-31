const mongoose = require("mongoose")
const pathIsRequired = "{PATH} is required."

let articleSchema = new mongoose.Schema({
	authorName: {type: String, required: pathIsRequired},
	authorId: {type: String, required: pathIsRequired, ref: "User"},
	title: {type: String, required: pathIsRequired, unique: true},
	bodyText: {type: String, required: pathIsRequired},
	comments: [{type: String, ref: "Comment"}]
})

let Article = mongoose.model("Article", articleSchema)

module.exports = Article
