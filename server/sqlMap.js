// sql语句
var sqlMap = {
  // 用户
  user: {
    add: 'insert into userInfo(username, password, nickname) values (?, ?, ?)',
    getUserByInfo: 'SELECT * FROM userInfo WHERE username = ?',
  }
}

module.exports = sqlMap;
