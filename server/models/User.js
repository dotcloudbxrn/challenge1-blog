const mongoose = require('mongoose')
const encryption = require('./../utils/encryption')
const pathIsRequired = '{PATH} is required.'
const Article = require('./Article')
const {ObjectId} = require('mongoose').Types

let userSchema = new mongoose.Schema({
  username: { type: String, required: pathIsRequired, unique: true},
  firstName: { type: String, required: pathIsRequired},
  lastName: { type: String, required: pathIsRequired},
  avatar: { type: String, default: "images/default-profile-pic.jpg"},
  bio: { type: String, default: "This user has not entered their bio yet." },
  salt: String,
  hashedPass: String,
  role: String,
  articles: [ {type: mongoose.Schema.Types.ObjectId, ref: 'Article'} ]
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
    }, (err, admin) => {
      if (err) {
        console.log('There was an error creating your admin user!')
        console.log(err)
        return
      }
      console.log('created Admin user', admin)
      User.find({}).then((adminArr) => {
        console.log(adminArr)
        let admin = adminArr[0]
        console.log('admin after arr', admin)
        
        Article.create({
          _id: new ObjectId(),
          authorName: "Admin",
          authorId: admin._id,
          title: "A very long title, for a very cool post",
          bodyText: `This is a really nice piece of example text. 
                    In it you can distinguish the author's fine taste
                    in literature, sophisticated philosophical views and
                    lack of coffee. He, though, had a nice cup of cocoa,
                    and is planning to have another one. 
                    The font in this app does not distinguish between capital and small-case letters.
                    This was not intentional and is sort of bugging the author of this text, but 
                    it's going to be something that we all have to deal with for a short while.
                    Thank you for reading.`
        }, (err, article) => {
          if (err) {
            console.log('There was an error creating the admin post!')
            console.log(err)
            return
          }
  
          console.log('inner article-', article)
          admin.articles.push(article._id)
          console.log('admin after push', admin)
          admin.save().then(() => {

          })
        })
    })
  })
})
}