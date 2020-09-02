var user = {
  login: 'select id, username, password from user where username=? and password=?',
  register: 'insert into user(username,password,sex) values(?,?,?)',
  userInfo: 'select id, username,sex from user where id=?'
}
module.exports = user