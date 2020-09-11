var mysql = require('mysql')
var connectionConfig = require('../dataBase/utils')
var commentSql = require('../dataBase/sqlMap/comment')
var comment = {
  insertComment: function(req, res) {
    var connection = mysql.createConnection(connectionConfig)
    connection.connect()
    var data = ''
    // 接收网页发过来的数据
    req.on('data', function(chunk){
      data = data + chunk
    })
    // 接收数据结束
    req.on('end', function() {
      // 对URL进行解析
      data = decodeURI(data)
      var dataObj = JSON.parse(data)
     
      connection.query(commentSql.insertComment, [dataObj.blog_id, dataObj.user_id, dataObj.content, dataObj.comment_id], function(err, result) {
        var resultObj ={}
        if(err) {
          res.writeHead('500', {'Content-Type': 'application/json'})
          resultObj = {
            code: -1,
            message: '发表失败'
          }
        }else{
          connection.query(commentSql.lastInsertId, function(err, result) {
            if(err){
            }else{
              res.writeHead(200, {'Content-Type': 'application/json'})
              console.log('result');
              console.log(result[0]['LAST_INSERT_ID()']);
              resultObj = {
                code: 0,
                message: '发表成功',
                data: {
                  id: result[0]['LAST_INSERT_ID()']
                }
              }
              res.end(JSON.stringify(resultObj))
            }
          })
        }
        
      })
      // connection.end()
    }) 
    
  },
  getComment: function(req, res) {
    
  },
  addLike: function(req, res) {
     var connection = mysql.createConnection(connectionConfig)
    connection.connect()
    let data = ''
    req.on('data', function(chunk) {
      data += chunk
    })
    req.on('end', function() {
      data = decodeURI(data)
      let dataObj = JSON.parse(data)
      console.log('data');
      console.log(dataObj);
      connection.query(commentSql.addlike, [dataObj.like_num, dataObj.id], function(err, result){
        let resObj = {}
        if(err) {
          console.log('出错了');
          console.log(err);
          res.writeHead(500, {'Content-Type': 'application/json'})
          resObj = {
            code: -1,
            message: '操作失败',
          }
        }else{
          console.log('队列');
          console.log(result);
          res.writeHead(200, {'Content-Type': 'application/json'})
          resObj = {
            code: 0,
            message: '操作成功',
          }
        }
        res.end(JSON.stringify(resObj))
      })
      connection.end()
    })
  }
}
module.exports = comment