var mysql = require('mysql')
var connectionConfig = require('../dataBase/utils')
var blogSql = require('../dataBase/sqlMap/blog')
var commentSql = require('../dataBase/sqlMap/comment')
var async = require('async')
var blog = {
  getBlog: function(req, res) {
    var connection = mysql.createConnection(connectionConfig)
    connection.connect()
    connection.query(blogSql.selectAll, function(err, result) {      
      var dataObj = {}
      if(err) {       
        res.writeHead(500, {'Content-Type': 'application/json'}) 
        dataObj = {
          code: -1,
          message: '访问数据库出错'
        }
      }else{
        res.writeHead(200, {'Content-Type': 'application/json'}) 
        dataObj = {
          code: 0,
          message: '成功',
          data: result
        }
      for(let i = 0; i< dataObj.data.length; i++) {
        var promise = new Promise(function(resolve, reject) {
            connection.query(commentSql.getComment,[dataObj.data[i].id], function(err, result) {
            if(err) {
              reject(err)
            }else{
              if(result.length > 0){
                dataObj.data[i].comment = result
              }
              resolve(dataObj.data[i])
            }
          })
        })
      }
      promise.then(function(result) {
        res.end(JSON.stringify(dataObj))

        }).catch(function(err) {
        })
      }
      
    })
  },
  getComment: function(data, connection) {
    let commentData = data
    var dataObj = {}
     for(let i = 0; i< data.length; i++) {
      var promise = new Promise(function(resolve, reject) {
          connection.query(commentSql.getComment,[data[i].id], function(err, result) {
          if(err) {
            reject(err)
          }else{
            if(result.length > 0){
              commentData[i].comment = result
            }
            resolve(commentData)
          }
        })
      })
    }
   promise.then(function(res) {
    }).catch(function(err) {
    })
  },
}
module.exports = blog