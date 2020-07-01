var http = require('http')
var child_process = require('child_process')
var fs = require('fs')
// 数据库
var mysql = require('mysql')
var connectionConfig = require('./dataBase/utils')
var blogSql = require('./dataBase/sqlMap/blog')
// 创建数据库连接
var connection = mysql.createConnection(connectionConfig)
connection.connect()
var server = http.createServer((req, res) => {
  if(req.url == '/') {  
    res.writeHead(200, {'Content-Type': 'text/html'})
    var home = fs.readFileSync('../BlogView/views/home.html')
    res.write(home)
    res.end()
  }else if(req.url == '/views/blog.html') {
    res.writeHead(200, {'Content-Type': 'text/html'})
    var blog = fs.readFileSync('../BlogView/views/blog.html')
    res.write(blog)
    res.end()
  }else if(req.url == '/views/user.html') {
    res.writeHead(200, {'Content-Type': 'text/html'})
    var user = fs.readFileSync('../BlogView/views/user.html')
    res.write(user)
    res.end()
  }else if(req.url == '/views/myConcern.html') {
    res.writeHead(200, {'Content-Type': 'text/html'})
    var myConcern = fs.readFileSync('../BlogView/views/myConcern.html')
    res.write(myConcern)
    res.end()
  }else if(req.url == '/views/personalInfo.html') {
    res.writeHead(200, {'Content-Type': 'text/html'})
    var personalInfo = fs.readFileSync('../BlogView/views/personalInfo.html')
    res.write(personalInfo)
    res.end()
  }else if(req.url == '/getBlog') {
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
      }
      res.end(JSON.stringify(dataObj))
    })
  }
  else if(req.url != '/') { // 处理html中获取静态文件
    var surl = '../BlogView' + req.url
    // 获取文件后缀类型
    var type = surl.substr(surl.lastIndexOf(".")+1,surl.length)
    if(type == 'js') {
      type = 'javascript'
    }
    res.writeHead(200,{'Content-type':"text/"+type});
        var ns = fs.readFile(surl, function(err, data) {
            if (err) {
                console.error(err);
                return;
            }
            res.end(data);
        });
  }
})
server.listen(3000, ()=> {
  console.log('服务器监听...');
  // child_process.exec('start http://127.0.0.1:3000')
})
