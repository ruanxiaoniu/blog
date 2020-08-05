import $ from './utils.js'
window.onload = function() {
  // 获取数据渲染
  getBlog()
  var menu = window.parent.document.getElementsByClassName('menu')[0]
  // 点击iframe内容时隐藏父级menu  
  document.body.addEventListener('click', function(ev) {      
    menu.style.display = 'none'
  })
}
function getBlog() {
  var res;
  var xmlHttp = $.XMLHttp();
  // 请求状态发生改变时
  xmlHttp.onreadystatechange = function() {
    if(xmlHttp.readyState == 4){
      res = JSON.parse(xmlHttp.responseText) 
      if(xmlHttp.status == 200) {
        if(res.code === 0) {
          console.log('返回来的数');
          console.log(res.data);
          
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
    console.log('comment');
    console.log(blog[i]);
    console.log(blog[i].comment);
    var section = document.createElement('section')
    var h4 = document.createElement('h4')
    var img = document.createElement('img')
    var imgSpan = document.createElement('span')
    var usernameSpan = document.createElement('span')
    var contentSpan = document.createElement('span')
    var userDiv = document.createElement('div')
    var contentDiv = document.createElement('div')
    var commentDiv = document.createElement('div')
    var commentTile = document.createElement('span')
    var commentContent = document.createElement('span')
    section.className = 'section'
    img.src = '../static/images/userGirl.png'
    img.alt = '头像'
    img.className = 'touxiangImg'
    h4.innerHTML = blog[i].title
    contentSpan.innerHTML = blog[i].content
    usernameSpan.innerHTML = blog[i].username
    imgSpan.append(img)
    usernameSpan.className= 'username'
    userDiv.className = 'userDiv'
    contentDiv.className = 'contentDiv'
    userDiv.append(imgSpan)
    userDiv.append(usernameSpan)
    contentDiv.append(contentSpan)
    section.append(h4)
    section.append(userDiv)
    section.append(contentDiv)
    blogEle.append(section)
    commentContent.innerHTML = '这是回复'
    commentTile.innerHTML = '回复：'
    commentDiv.append(commentTile)
    commentDiv.append(commentContent)
    section.append(commentDiv)
    // 创建评论树形结构
    let commTrees;
    if(blog[i].comment) {
      commTrees = creatTrees(blog[i].comment)
      console.log('结束返回的tress');
      console.log(commTrees);
      var div = document.createElement('div')
      creatCommTrees()
    }
   
  }
}

// 创建树形结构（评论内容相当于树）
function creatTrees(comment) {
  let trees = []
  comment.forEach((item,index) => {
    if(!item.comment_id){ // 创建一棵新树
      trees.push(new Trees(item)) 
    }else{
      console.log('Tree');
      console.log(trees);
      trees.forEach((ele, index) => {
        console.log('ele');
        console.log(ele.node.id);
        console.log(item.comment_id);
        if(ele.node.id === item.comment_id){
          ele.insertNode(item)
        }
      })
    }
  });
  return trees
}
// 树类
class Trees {
  constructor(node) {
    var div = document.createElement('div')
    var commentTitle = document.createElement('span')
    var commentContent = document.createElement('span')
    commentTitle.innerHTML = '回复：'
    commentContent.innerHTML = `${node.content}`
    div.append(commentTitle)
    div.append(commentContent)
    this.node = node
    this.comment =div
    this.chirldren = []
  }
  insertNode(data) {
    console.log(this.chirldren);
    let chirldren = new Trees(data)
    this.chirldren.push(chirldren)
    // this.div.append(chirldren.div)
  }
}

// 递归创建回复


// 创建回复DOM
function creatCommTrees(trees) {
  
  
}