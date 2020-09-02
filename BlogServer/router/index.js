var blog  = require('./blog')
var user = require('./user')
var comment = require('./comment')
var router = {
  blog,
  user,
  comment
}
module.exports = router