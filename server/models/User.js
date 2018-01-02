const mongoose = require('mongoose')
const encryption = require('./../utils/encryption')
const pathIsRequired = '{PATH} is required.'
const {ObjectId} = require('mongoose').Types

let userSchema = new mongoose.Schema({
	username: { type: String, required: pathIsRequired, unique: true},
	firstName: { type: String, required: pathIsRequired},
	lastName: { type: String, required: pathIsRequired},
	avatar: { type: String, default: '/images/default-profile-pic.jpg'},
	bio: { type: String, default: 'This user has not entered their bio yet.' },
	salt: String,
	hashedPass: String,
	role: String,
	articles: [ {type: mongoose.Schema.Types.ObjectId, ref: 'Article'} ],
	comments: [ {type: mongoose.Schema.Types.ObjectId, ref: 'Comment'} ]
})

userSchema.method({
	authenticate: function(password) {
		return encryption.generateHashedPassword(this.salt, password) === this.hashedPass ? true : false
	}
})

let User = mongoose.model('User', userSchema)

module.exports = User


module.exports.seedAdminUser = () => {
	User.find({}).then((users) => {
		if (users.length > 0) {
			console.log(`There are ${users.length} registered users.`)
			return
		}

		let salt = encryption.generateSalt()
		let hashedPass = encryption.generateHashedPassword(salt, 'password')
		User.create({
			username: 'admin',
			firstName: 'Apostol',
			lastName: 'Tonev',
			salt, 
			hashedPass,
			role: 'Admin'
		}, (err) => {
			if (err) {
				return err
			}
		})
	})
}