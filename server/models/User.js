const mongoose = require('mongoose')
const encryption = require('./../utils/encryption')
const pathIsRequired = '{PATH} is required.'

let userSchema = new mongoose.Schema({
  username: { type: String, required: pathIsRequired, unique: true},
  firstName: { type: String, required: pathIsRequired},
  lastName: { type: String, required: pathIsRequired},
  bio: { type: String },
  salt: String,
  hashedPass: String,
  roles: [String]
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
      roles: ['Admin']
    }, (err, admin) => {
      if (err) {
        console.log('There was an error creating your admin user!')
        console.log(err)
        return
      }
      console.log('User created:', admin);
    })
  })
}