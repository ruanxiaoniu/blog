var blogSql = {
  selectAll : 'select blog.id,blog.title,blog.content,user.username,user.sex from user inner join blog on user.id = blog.user_id'
}
module.exports = blogSql