var blogSql = {
  selectAll : 'select blog.id,blog.title,blog.content,user.username from user inner join blog on user.id = blog.user_id'
}
module.exports = blogSql