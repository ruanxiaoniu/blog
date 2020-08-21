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
  var tree = []
  // 请求状态发生改变时
  xmlHttp.onreadystatechange = function() {
    if(xmlHttp.readyState == 4){
      res = JSON.parse(xmlHttp.responseText)
      if(xmlHttp.status == 200) {
        if(res.code === 0) {
          var data = Array.from(res.data)
          // 使用返回的数据的评论去创建一棵树,多少条博客就有多少棵树，博客是树的根节点
          for(let i = 0; i< data.length; i++) {
            if(data[i].comment) {
              for(let j = 0; j < Array.from(data[i].comment).length; j++) {
                let commentItem  = data[i].comment[j]
                if(commentItem.comment_id === null) {
                  let treeItem = new Trees(commentItem)
                  tree[i] = new Array() // 该微博下对应的评论
                  tree[i].push(treeItem)
                }else{ // 不是的话就要找到对应的回复插入做回复的回复
                  for(let k = 0; k < tree.length; k++) {
                    if(commentItem.comment_id === tree[i][k].val.id) {
                      insertNode( tree[i][k], commentItem)
                      break;
                    }
                  }
                }
              }
            }
          }

         //渲染
         renderBlog(data, tree)
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


// 树类
class Trees{
  constructor(val) {
    this.val = val
    this.chilren = null
  }
}
// insertTree
function insertNode(currentTree, insertTree) {
  let chilren = new Trees(insertTree)
  currentTree.chilren = chilren
}
// 遍历树
function search(tree) {
  
  if(tree === null) {
    return ''
  }else{
    console.log('tree');
    console.log(tree);
    let type = '评论'
    if(tree.val.comment_id === null) {
      type = '评论'
    }else{
      type = '回复'
    }
    let touxiang = '/static/images/userGirl.png'
    if(tree.val.sex === 0) {
      touxiang = '/static/images/userMan.png'
    }
    var str = `<div style='margin-left: 20px;margin-top: 10px'>
                <span>
                  <img class='touxiangImg' src='${touxiang}'>
                </span>
                <span>${tree.val.username}</span>
                <span>${type}：</span>
                <span>${tree.val.content}</span>
                <div class='pinglunsvgDiv'>
                  <svg class="icon1" aria-hidden="true">
                    <use xlink:href='#iconpinglun1'></use>
                  </svg>
                </div>
                <div class='svgDiv'>
                  <svg class="icon2" aria-hidden="true">
                    <use xlink:href='#icondianzan'></use>
                  </svg>
                </div>`
    return str + search(tree.chilren) + '</div>'
  }
}
// 渲染
function renderBlog(data, tree) {
  let blogEle = document.getElementById('blog')
  data.forEach((item, index) => {
    var section = document.createElement('section')
    section.className = 'section'
    // 用户头像和用户名块
    var userDiv = document.createElement('div')
    userDiv.className = 'userDiv'
    // 用户块中的头像
    var imgSpan = document.createElement('span')
    var img = document.createElement('img')
    if(item.sex === 0) {
      img.src = '/static/images/userMan.png'
    }else{
      img.src = '/static/images/userGirl.png'
    }
    img.className = 'touxiangImg'
    imgSpan.append(img)
    // 用户块中的用户名
    var usernameSpan = document.createElement('span')
    usernameSpan.innerHTML = item.username
    usernameSpan.className = 'username'
    // 把用户名和用户头像放进用户块中
    userDiv.append(imgSpan)
    userDiv.append(usernameSpan)
    // 内容块
    var contentDiv = document.createElement('div')
    contentDiv.className = 'contentDiv'
    contentDiv.innerHTML = item.content
    // 评论按钮块
    var pinglunBtn = document.createElement('div')
    pinglunBtn.className = 'pinglunsvgDiv'
    var pinglunStr = `<svg class="icon1" aria-hidden="true">
                        <use xlink:href='#iconpinglun1'></use>
                      </svg>
                     `
    pinglunBtn.innerHTML = pinglunStr
    var dianznaBtn = document.createElement('div')
    dianznaBtn.className = 'svgDiv'
    var dianzanStr = `<svg class="icon2" aria-hidden="true">
                      <use xlink:href='#icondianzan'></use>
                    </svg>`
    dianznaBtn.innerHTML = dianzanStr
    contentDiv.append(pinglunBtn)
    contentDiv.append(dianznaBtn) 
    // 把内容块、用户块放进section中
    section.append(userDiv)
    section.append(contentDiv)
    blogEle.append(section)
    // 回复块
    var commentDiv = document.createElement('div')
    // 存在评论
    if(tree[index]) {
      for(let i = 0 ;i< tree[index].length; i++) {
        // 递归得到DOM结构字符串
        var result = search(tree[index][i])
        commentDiv.innerHTML = result
        section.append(commentDiv)
      }
    }
  });
}