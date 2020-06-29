var http = require('http')
var child_process = require('child_process')
var fs = require('fs')
var url  = require('url')
var path = require('path')
var server = http.createServer((req, res) => {
  console.log('url');
  console.log(req.url);
  
  if(req.url == '/') {    
    res.writeHead(200, {'Content-Type': 'text/html'})
    var home = fs.readFileSync('../BlogView/views/home.html')
    res.write(home)
    res.end()
  }else if(req.url == '/blog.html') {
    res.writeHead(200, {'Content-Type': 'text/html'})
    var blog = fs.readFileSync('../BlogView/views/blog.html')
    res.write(blog)
    res.end()
  }else if(req.url == '/user.html') {
    res.writeHead(200, {'Content-Type': 'text/html'})
    var user = fs.readFileSync('../BlogView/views/user.html')
    res.write(user)
    res.end()
  }else if(req.url == '/myConcern.html') {
    res.writeHead(200, {'Content-Type': 'text/html'})
    var myConcern = fs.readFileSync('../BlogView/views/myConcern.html')
    res.write(myConcern)
    res.end()
  }else if(req.url == '/personalInfo.html') {
    res.writeHead(200, {'Content-Type': 'text/html'})
    var personalInfo = fs.readFileSync('../BlogView/views/personalInfo.html')
    res.write(personalInfo)
    res.end()
  }
  else if(req.url != '/') {
    var surl = '../BlogView' + req.url
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
