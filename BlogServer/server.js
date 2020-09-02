var http = require('http')
var child_process = require('child_process')
var fs = require('fs')
var url = require('url')
// querystring是nodejs内置的一个专用于处理url的模块
var router = require('./router/index')
var server = http.createServer((req, res) => {
  console.log('url');
  var pathname = (url.parse(req.url)).pathname
  console.log(pathname);
  if(pathname == '/') {  
    res.writeHead(200, {'Content-Type': 'text/html'})
    var home = fs.readFileSync('../BlogView/views/home.html')
    res.write(home)
    res.end()
  }else if(pathname == '/views/blog.html') {
    res.writeHead(200, {'Content-Type': 'text/html'})
    var blog = fs.readFileSync('../BlogView/views/blog.html')
    res.write(blog)
    res.end()
  }else if(pathname == '/views/user.html') {
    res.writeHead(200, {'Content-Type': 'text/html'})
    var user = fs.readFileSync('../BlogView/views/user.html')
    res.write(user)
    res.end()
  }else if(pathname == '/views/myConcern.html') {
    res.writeHead(200, {'Content-Type': 'text/html'})
    var myConcern = fs.readFileSync('../BlogView/views/myConcern.html')
    res.write(myConcern)
    res.end()
  }else if(pathname == '/views/myFans.html') {
    res.writeHead(200, {'Content-Type': 'text/html'})
    var myFans = fs.readFileSync('../BlogView/views/myFans.html')
    res.write(myFans)
    res.end()
  }else if(pathname == '/views/personalInfo.html') {
    res.writeHead(200, {'Content-Type': 'text/html'})
    var personalInfo = fs.readFileSync('../BlogView/views/personalInfo.html')
    res.write(personalInfo)
    res.end()
  }else if(pathname == '/views/login.html') {
    
    res.writeHead(200, {'Content-Type': 'text/html'})
    var login = fs.readFileSync('../BlogView/views/login.html')
    res.write(login)
    res.end()
  }else if(pathname == '/getBlog') {
    router.blog.getBlog(req, res)
  }else if(pathname == '/login'){
    router.user.login(req, res)
  }else if(pathname == '/register'){
    router.user.register(req, res)
  }else if(pathname =='/publishComment'){
    router.comment.insertComment(req, res)
  }else if(pathname == '/getUserById') {
    router.user.getuserById(req, res)
  }
  else if(pathname != '/') { // 处理html中获取静态文件
    var surl = '../BlogView' + pathname
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
