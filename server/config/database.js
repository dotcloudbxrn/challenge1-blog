const mongoose = require('mongoose')
mongoose.Promise = global.Promise

module.exports = (settings) => {
	mongoose.connect(settings.dbPath, {
		useMongoClient: true
	})

	let db = mongoose.connection

	db.once('open', (err) => {
		if (err) {
			throw err
		}

		console.log('Successfully connected to MongoDB')
	})

	db.on('error', (err) => {
		throw err
	})

	require('./../models/User')
	let User = require('./../models/User')

  
	User.seedAdminUser()
}