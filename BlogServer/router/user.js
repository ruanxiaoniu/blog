var mysql = require('mysql')
var connectionConfig = require('../dataBase/utils')
var userSql = require('../dataBase/sqlMap/user')
var user = {
  // 登录
  login: function(req, res) {
    var connection = mysql.createConnection(connectionConfig)
    connection.connect()
    var data = ''
    // 接收网页发送过来的数据
    req.on('data', function(chunk) {      
      data += chunk
    })
    req.on('end', function(){  
      // 对URL进行解析
      data = decodeURI(data)
      var dataObj = JSON.parse(data)
      connection.query(userSql.login,[dataObj.username, dataObj.password], function(err, result) {
        var reqResult = {}    
        // console.log('获取用户信息');
        // console.log(result);    
        if(err) {
          res.writeHead(500, {'Content-Type': 'application/json'})
          reqResult = {
            code: -1,
            message: '数据库出错',
          }
        }else if(result.length > 0){
          let id = result[0].id
          res.writeHead(200, {'Content-Type': 'application/json'})
          reqResult = {
            code: 0,
            message: '操作成功',
            token: 'token',
            id,
          }
        }else{
          res.writeHead(200, {'Content-Type': 'application/json'})
          reqResult = {
            code: -2,
            message: '用户名或密码错误！'
          }
        }
        res.end(JSON.stringify(reqResult))
      })
      connection.end()
    })
   
  },

  // 注册
  register: function(req, res) {
    var connection = mysql.createConnection(connectionConfig)
    connection.connect()
    var data = ''
    req.on('data', function(chunk) {      
      data += chunk 
    })
    req.on('end', function() {
      data = decodeURI(data)
      dataObj = JSON.parse(data)
      console.log('data');
      console.log(dataObj);
      connection.query(userSql.register, [dataObj.username, dataObj.password, dataObj.sex], function(err, result) {
        var reqResult = {}
        if(err) {
          res.writeHead(500, {'Content-Type': 'application/json'})
          reqResult = {
            code: -1,
            message: '数据库出错'
          }
        }else{
          res.writeHead(200, {'Content-Type': 'application/json'})
          reqResult = {
            code: 0,
            message: '注册成功！',
          }
        }
        res.end(JSON.stringify(reqResult))
      })
      connection.end()
    })
  },
  //根据ID获取用户信息
  getuserById: function(req, res) {
    var connection = mysql.createConnection(connectionConfig)
    connection.connect()
    var data = ''
    req.on('data', function(chunk) {
      data += chunk
    })
    req.on('end', function(){
      data = decodeURI(data)
      let dataObj = JSON.parse(data)
      connection.query(userSql.userInfo, [dataObj.id], function(err, result) {
        let resResult = {}
        if(err) {
          res.writeHead(500, {'Content-Type': 'application/json'})
          resResult = {
            code: -1,
            message: '查询失败'
          }
        }else{
          res.writeHead(200, {'Content-Type': 'application/json'})
          resResult = {
            code: 0,
            message: '查询成功',
            data: result
          }
        }
        res.end(JSON.stringify(resResult))
      })
      connection.end()
    })
  },
}
module.exports = user