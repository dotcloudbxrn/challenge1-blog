const multer = require("multer")
const crypto = require("crypto")
const mime = require("mime")

let storage = multer.diskStorage({
	destination: function(req, file, cb) {
		cb(null, "public/images/profile-pictures/")
	}, 
	filename: function(req, file, cb) {
		crypto.pseudoRandomBytes(16, function(err, raw) {
			cb(null, raw.toString("hex") + Date.now() + "." + mime.getExtension(file.mimetype))
		})
	}
})

module.exports = {storage}