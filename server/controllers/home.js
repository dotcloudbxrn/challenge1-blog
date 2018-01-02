const User = require('./../models/User')

module.exports = {
	index: (req, res) => {
		User.find({})
			.populate('articles')
		// .exec()
			.then((users) => {
				var obj = {}
				obj.users = users
				if(req.query.success) {
					obj.success = req.query.success
				}
				res.render('home/home', obj)
			}, (err) => {
				console.log(err)
			})
	}
}