var blogSql = {
  selectAll : 'select blog.id,blog.title,blog.content,blog.like_num,user.username,user.sex from user inner join blog on user.id = blog.user_id',
  addLike: 'update blog set like_num = ? where id = ?',
  getMyConcernBlog:'select blog.id,blog.title,blog.content,blog.like_num,user.username,user.sex from user inner join blog on user.id = blog.user_id where blog.user_id =?'
}
module.exports = blogSql