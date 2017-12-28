const mongoose = require('mongoose')
const encryption = require('./../utils/encryption')
const pathIsRequired = '{PATH} is required.'
const User = require('./../models/User')
const {ObjectId} = require('mongoose').Types


let articleSchema = new mongoose.Schema({
  authorName: {type: String, required: pathIsRequired},
  authorId: {type: String, required: pathIsRequired, ref: 'User'},
  title: {type: String, required: pathIsRequired, unique: true},
  bodyText: {type: String, required: pathIsRequired}
})

let Article = mongoose.model('Article', articleSchema)

module.exports = Article

module.exports.seedAdminPosts = () => {
  Article.find({}).then((articles) => {
    if (articles.length > 0) {
      console.log(`There are ${articles.length} articles`)
      return
    }
    User.find({"roles":"Admin"}).then((adminArr) => {

      let admin = adminArr[0]

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
        admin.articles.push(article._id)
        admin.save().then((user, err) => {
          if (err) {
            return err
          }
          // rejoice
        })
      })
    }) 
  })
}