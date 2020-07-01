window.onload = function() {
  // 获取数据渲染
  getBlog()
}
function getBlog() {
  var res;
  var xmlHttp;
  // 判断兼容性,创建XMLHttpRequest对象
  if(window.XMLHttpRequest) {
    xmlHttp = new XMLHttpRequest()
  }else{
    xmlHttp = new ActiveXObject('Microsoft.XMLHTTP')
  }
  // 请求状态发生改变时
  xmlHttp.onreadystatechange = function() {
    if(xmlHttp.readyState == 4){
      res = JSON.parse(xmlHttp.responseText) 
      if(xmlHttp.status == 200) {
        if(res.code === 0) {
          // 执行渲染函数
          render(res.data)
        }
      }else {
        alert(res.message)
         return
      }
    }
  }
  // 发送请求, true为异步
  xmlHttp.open('GET', '/getBlog', true)
  xmlHttp.send()
  // return res
}

// 渲染进页面
function render(blog) {
  var blogEle = document.getElementById('blog')
  for(var i =0 ;i< blog.length; i++) {
    var section = document.createElement('section')
    var h4 = document.createElement('h4')
    var img = document.createElement('img')
    var imgSpan = document.createElement('span')
    var usernameSpan = document.createElement('span')
    var contentSpan = document.createElement('span')
    var div = document.createElement('div')
    section.className = 'section'
    img.src = '../static/images/userGirl.png'
    img.alt = '头像'
    img.className = 'touxiangImg'
    h4.innerHTML = blog[i].title
    contentSpan.innerHTML = blog[i].content
    usernameSpan.innerHTML = blog[i].username
    imgSpan.append(img)
    usernameSpan.className= 'username'
    div.append(imgSpan)
    div.append(usernameSpan)
    div.append(contentSpan)
    section.append(h4)
    section.append(div)
    blogEle.append(section)
  }
}