const encryption = require("./../utils/encryption")
const User = require("../models/User")

module.exports = {
	registerGet: (req, res) => {
		res.render("user/register")
	},

	registerPost: (req, res) => {
		let reqUser = req.body
		// add validation maybe
		if(!reqUser.username || !reqUser.password || !reqUser.firstName || !reqUser.lastName) {
			res.locals.globalError = "Invalid User Data"
			res.render("user/register")
			return
		}
		let salt = encryption.generateSalt()
		let hashedPassword = encryption.generateHashedPassword(salt, reqUser.password)
		User.create({
			// I'm aware it's horrible to use toLowerCase for the username, but the fontface I chose 
			// doesn't differentiate between capital and lowercase characters, so...
			username: reqUser.username.toLowerCase(),
			firstName: reqUser.firstName,
			lastName: reqUser.lastName,
			salt: salt,
			hashedPass: hashedPassword,
			roles: ["user"]
		}).then((user) => {
			req.logIn(user, (err, user) => {
				if (err) {
					res.locals.globalError = err
					res.render("user/register", user) 
				}
				res.redirect("/")
			})
		})
	},

	logout: (req, res) =>  {
		req.logout()
		res.redirect("/")
	},

	loginGet: (req, res) => {
		res.render("user/login")
	},

	loginPost: (req, res) => {
		let reqUser = req.body
		User.findOne({username:reqUser.username.toLowerCase()}).then((user) => {
			if (!user) {
				res.locals.globalError = "Invalid user data"
				res.render("user/login")
				return
			}
			if (!user.authenticate(reqUser.password)) {
				res.locals.globalError = "Invalid user data"
				res.render("user/login")
				return
			}
			req.logIn(user, (err) => {
				if (err) {
					res.locals.globalError = err
					res.render("user/login")
					return
				}
				res.redirect("/")
			})
		}).catch((err) => {
			console.log(err)
		})
	},
	getProfile:(req, res) => {
		let id = req.params.id
		User.findById(id).then((user) => {
			if (!user) console.log("User not found")
			res.render("user/profile", {user})
		})
	},
	editProfileGet: (req, res) => {
		let id = req.params.id
		User.findById(id).then((user) => {
			if (!user) console.log("User not found")
			res.render("user/edit-profile", {user})
		})
	},
	editProfilePost: (req, res) => {
		let userId = req.params.id
		let changedUser = req.body
		User.findById(userId).then((user) => {
			if(!user) {
				res.redirect("/")
				return "No such user found"
			}

			if (changedUser.avatar) {
				user.avatar = changedUser.avatar
			}

			if (changedUser.lastName.length < 1 || changedUser.firstName.length < 1 || changedUser.bio.length < 1) {
				res.locals.globalError = "Invalid user input"
				res.render("user/edit-profile", {user})
				return
			}
    
			user.firstName = changedUser.firstName
			user.lastName = changedUser.lastName
			user.bio = changedUser.bio
			user.save().then(() => {
				res.redirect(`/user/profile/${userId}`)
			})
		})
	},
	getComments: (req, res) => {
		let id = req.params.id 
		User.findById(id)
			.populate("comments")
			.then((user) => {
				res.render("user/comments", user)
			})
	}
}