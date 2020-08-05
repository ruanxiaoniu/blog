var user = {
  login: 'select username, password from user where username=? and password=?',
  register: 'insert into user(username,password,sex) values(?,?,?)',
}
module.exports = user