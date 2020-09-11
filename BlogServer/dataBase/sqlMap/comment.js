var comment = {
  // getComment: 'select * from comment where blog_id = ?',
  getComment: 'select comment.like_num,comment.id,comment.content,comment.blog_id,comment.comment_id,comment.user_id,user.username,user.sex from user inner join comment  on user.id = comment.user_id where blog_id = ?',
  insertComment: 'insert into comment (blog_id, user_id, content, comment_id) values(?,?,?,?)',
  lastInsertId: 'SELECT LAST_INSERT_ID() from comment',
  addlike: 'update comment set like_num = ? where id = ?'
}
module.exports = comment