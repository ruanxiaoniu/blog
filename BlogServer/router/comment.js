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
          console.log('err');
          console.log(err);
          res.writeHead('500', {'Content-Type': 'application/json'})
          resultObj = {
            code: -1,
            message: '发表失败'
          }
        }else{
          connection.query(commentSql.lastInsertId, function(err, result) {
            if(err){
              console.log('出错了？');
              console.log(err);
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
    
  }
}
module.exports = comment