const User = require('./../models/User')
const Article = require('./../models/Article')
const {ObjectId} = require('mongoose').Types

module.exports = {
  createArticleGet: (req, res) => {
    res.render('article/create')
  },
  createArticlePost: (req, res) => {
    let article = req.body;
    let userId = res.locals.currentUser._id
    User.findById(userId).then((author) => {
      let articleId = new ObjectId()
      article.authorName = author.username
      article.authorId = author._id
      article._id = articleId
      author.articles.push(articleId)
      author.save()
      Article.create(article).then(() => {
        res.redirect('/')
      })
    })
  },
  detailsGet: (req, res) => {
    let articleId = req.params.id
    Article.findById(articleId).then((article) => {
      res.render('article/details', article)
    })
  }
}