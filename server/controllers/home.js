const User = require("./../models/User")

module.exports = {
	index: (req, res) => {
		User.find({})
			.populate("articles")
		// .exec()
			.then((users) => {
				res.render("home/home", {users})
			})
	}
}