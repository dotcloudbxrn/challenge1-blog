const User = require('./../models/User')

module.exports = {
  index: (req, res) => {
    User.find({}).then((users) => {
      res.render('home/home', {users})
    })
  }
}