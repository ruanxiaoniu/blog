var comment = {
  // getComment: 'select * from comment where blog_id = ?',
  getComment: 'select comment.id,comment.content,comment.blog_id,comment.comment_id,comment.user_id,user.username,user.sex from user inner join comment  on user.id = comment.user_id where blog_id = ?'
}
module.exports = comment