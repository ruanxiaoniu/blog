import $ from './utils.js'
import { getToken } from '../../localStorage/index.js'
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
            tree[i] = new Array()
            if(data[i].comment) {
              let nodechild = []
              // 先找到评论树根节点
              for(let j = 0; j < Array.from(data[i].comment).length; j++) {
                let commentItem  = data[i].comment[j]
                if(commentItem.comment_id === null || commentItem.comment_id == 0) {
                  let treeItem = new Trees(commentItem)
                 // 该微博下对应的评论
                  tree[i].push(treeItem)
                }else{ // 不是的话就要找到对应的回复插入做回复的回复
                  nodechild.push(commentItem)
                }
              }
              for(let j = 0; j< nodechild.length; j++) {
                for(let k = 0; k < tree[i].length; k++) {
                  insertNode(tree[i][k], nodechild[j])
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
}

// 树类
class Trees{
  constructor(val) {
    this.val = val
    this.chilren = []
  }
}
// insertTree
function insertNode(currentTree, insertTree) {
  if(currentTree) {
    if(currentTree.val.id === insertTree.comment_id) {
      let child = new Trees(insertTree)
      currentTree.chilren.push(child)
    }else{
      for(let i = 0; i < currentTree.chilren.length; i++) {
        insertNode(currentTree.chilren[i], insertTree)
      }
    }
  }
}
// 遍历树
function search(tree) {
  if(tree === null) {
    return ''
  }else{
    if(tree.val) {
      let type = '评论'
      let touxiang = '/static/images/userGirl.png'
      if(tree.val.sex === 0) {
        touxiang = '/static/images/userMan.png'
      }
      let strData = {
        id: tree.val.id,
        blog_id: tree.val.blog_id,
        username: tree.val.username,
        content: tree.val.content,
        sex: tree.val.sex === 0 ? 0 : 1,
        like_num: tree.val.like_num
      }
      if(tree.chilren.length > 0) {
        for(let i = 0; i <tree.chilren.length; i++) {
          var str = createCommentStr(strData, touxiang, type)
          return str + search(tree.chilren[i]) + '</div>'
        }
      }else{
        var str = createCommentStr(strData, touxiang, type)
        return str + '</div>'
      }
    }
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
    var contenSpan = document.createElement('span')
    contenSpan.className = 'contentSpan'
    contenSpan.innerHTML = item.content
    contentDiv.append(contenSpan)
    // 评论按钮块
    var pinglunBtn = document.createElement('div')
    pinglunBtn.className = 'pinglunsvgDiv'
    pinglunBtn.id = 'pinglun'
    var pinglunStr = `<svg class="icon1" aria-hidden="true">
                        <use xlink:href='#iconpinglun1'></use>
                      </svg>
                     `
    pinglunBtn.innerHTML = pinglunStr
    var dianznaBtn = document.createElement('div')
    dianznaBtn.className = 'svgDiv'
    dianznaBtn.id = 'dianzan'
    var dianzanStr = `<svg class="icon2" aria-hidden="true">
                      <use xlink:href='#icondianzan'></use>
                    </svg>`
    dianznaBtn.innerHTML = dianzanStr
    var likeNum = document.createElement('span')
    if(item.like_num) {
      likeNum.innerHTML = `(${item.like_num})`
    }
    likeNum.className = 'like_num'
    dianznaBtn.append(likeNum)
    contentDiv.append(pinglunBtn)
    contentDiv.append(dianznaBtn) 
    // 把内容块、用户块放进section中
    section.append(userDiv)
    section.append(contentDiv)
     // 回复块
     var commentDiv = document.createElement('div')
     commentDiv.className= 'commentDiv'
    // 点击评论按钮, 显示评论输入框
    pinglunBtn.addEventListener('click', function(ev) {
      if(getToken()) {
        // 阻止冒泡
        ev.stopPropagation()
        var commemsubmit = section.getElementsByClassName('commentDiv')[0]
        let sectionChild = section.firstChild.nextSibling
        let formArry = Array.from(sectionChild.getElementsByClassName('commentFormDivShow'))
        // 防止多次点击生成多个表单节点
        if(!formArry.length > 0) {
          var commentFormDiv =  creatCommentForm('commentFormDivShow', item.id, item.comment_id,commemsubmit)
          sectionChild.append(commentFormDiv)
        }else{
          // 当已经有评论表单时，再次点击则隐藏表单
          sectionChild.removeChild(formArry[0])
        }
      }else{
        alert('请登录！')
      }
    })
    dianznaBtn.addEventListener('click', function(ev) {
      if(getToken()) {
        // 阻止冒泡
        ev.stopPropagation()
        let num = 0
        if(item.like_num) {
          num = item.like_num + 1
        }else{
          num = 1
        }
        // 把点赞数加入数据库
        dianzanSubmit('blog', item.id, num, dianznaBtn)
      }else{
        alert('请登录！')
      }
    })
    blogEle.append(section)
    // 点击评论区
    commentDiv.addEventListener('click', function(ev) {
      clickComment(ev, tree[index])
    })
   
    // 存在评论
    if(tree[index]) {
      renderComment(tree[index], commentDiv, section)
    }
  });
}

// 渲染评论块，单独出去出来是因为发表评论后需要重新更新某一个评论区
function renderComment(tree, commentDiv, section) {
  
  for(let i = 0 ;i< tree.length; i++) {
    var chilrenDiv = document.createElement('div')
    // 递归得到DOM结构字符串
    var result = search(tree[i])
    chilrenDiv.innerHTML = result
    commentDiv.append(chilrenDiv)
    // 添加点击事件
    section.append(commentDiv)
  }
}
// 提交发表的评论
function subimitPublish(data,parent, commentInput) {
  var xmlHttp = $.XMLHttp()
  var xmlHttp2 = $.XMLHttp()
  let xml2Data = {
    id: data.user_id
  }
  var endData = {}
  let touxiang = '/static/images/userGirl.png'
  let type = '评论'
  xmlHttp.onreadystatechange = function() {
    if(xmlHttp.readyState === 4) {
      if(xmlHttp.status === 200) {
        let resData = JSON.parse(xmlHttp.responseText) 
        //发表成功后获取这条评论信息，再插入树中
        if(resData.code === 0) {
          // 把id放进数据中
          endData.id = resData.data.id
          endData.blog_id = data.blog_id
          endData.content = data.content
          commentInput.value = ''
        }     
      }
    }
  }
  xmlHttp2.onreadystatechange = function() {
    if(xmlHttp2.readyState === 4) {
      if(xmlHttp2.status === 200) {
        let resData = JSON.parse(xmlHttp2.responseText)
        endData.username = resData.data[0].username
        if(resData.data[0].username.sex == 0) {
          endData.touxiang = '/static/images/userMan.png'
        }
      }
    }
  }
  xmlHttp.open('post', '/publishComment', false)
  xmlHttp.send(JSON.stringify(data))
  xmlHttp2.open('post', '/getUserById', false)
  xmlHttp2.send(JSON.stringify(xml2Data))
  endData.like_num = 0
  var commentStr = createCommentStr(endData, touxiang, type)
  let commentDiv = document.createElement('div')
  commentDiv.innerHTML = commentStr
  parent.append(commentDiv)
}

// 点击评论区块所需的操作
function clickComment(ev) {
  let event = ev || window.event
  let target = event.target || event.srcElement
  if(target.tagName === 'svg') {
    if(getToken()) {
      // 点击了评论
      let parent = target.parentNode.parentNode
      if(target.className.baseVal === 'icon1'){
        let next = target.parentNode.nextElementSibling.nextElementSibling
        let formArry = Array.from(parent.getElementsByClassName('commentFormDivShow'))
        if(!formArry.length > 0) {
          // 发表评论表单块
          var commentFormDiv =  creatCommentForm('commentFormDivShow', parent.getAttribute('blog_id'), parent.getAttribute('comment_id'), parent)
          // commentFormDiv作为parent的子节点在next前插入
          parent.insertBefore(commentFormDiv, next)
        }else{
          parent.removeChild(formArry[0])
        }
      }else{ // 点击了点赞
        let value = target.nextElementSibling.innerHTML
        let like_num = parseInt(value.substring(1, value.length - 1))
        let id = parent.getAttribute('comment_id')
        let num = 0
        if(like_num) {
          num = like_num + 1
        }else{
          num = 1
        }
        dianzanSubmit('comment', id, num, target.nextElementSibling)
      }
    }else{
      alert('请登录！')
    }
  }
}

// 发表评论表单块
function creatCommentForm(commentDivClassName, blog_id, comment_id, parent){
  var commentFormDiv = document.createElement('div')
  commentFormDiv.className = commentDivClassName
  var commentInput = document.createElement('input')
  commentInput.className = 'input'
  var publishBtn = document.createElement('button')
  publishBtn.innerHTML = '发表'
  publishBtn.className = 'btn btn-primary'
  publishBtn.setAttribute('blog_id', blog_id)
  publishBtn.setAttribute('comment_id', comment_id)
  var cancelBtn = document.createElement('button')
  cancelBtn.innerHTML = '取消'
  cancelBtn.className = 'btn btn-warning'
  commentFormDiv.append(commentInput)
  commentFormDiv.append(publishBtn)
  commentFormDiv.append(cancelBtn)
    // 点击发表按钮
    publishBtn.addEventListener('click', function(ev) { 
      ev.stopPropagation()    
      // 获取输入框内容
      var text = commentInput.value
      // 博客id
      var comment_id = publishBtn.getAttribute('comment_id')
      var blog_id = publishBtn.getAttribute('blog_id')
      // 当前用户id
      var user_id = getToken()
      let data = {
        blog_id,
        comment_id : comment_id ? comment_id : null,
        user_id,
        content: text
      }
      // 发表后把评论存进数据库, 有发表内容才会请求
      if(data.content) {
        subimitPublish(data, parent, commentInput)
      }
      
    })
    // 点击取消按钮
    cancelBtn.addEventListener('click',function(ev) {
      ev.stopPropagation()
      commentFormDiv.className = 'commentFormDivHidden'
      commentInput.value = ''
    })
  return commentFormDiv
}

function createCommentStr(val, touxiang, type) {
  var str = `<div class='oneComment' comment_id='${val.id}' blog_id='${val.blog_id}' style='margin-left: 20px;margin-top: 10px'>
            <span>
              <img class='touxiangImg' src='${touxiang}'>
            </span>
            <span>${val.username}</span>
            <span>${type}：</span>
            <span>${val.content}</span>
            <div class='pinglunsvgDiv'>
              <svg class="icon1" aria-hidden="true">
                <use xlink:href='#iconpinglun1'></use>
              </svg>
            </div>
            <div class='svgDiv'>
              <svg class="icon2" aria-hidden="true">
                <use xlink:href='#icondianzan'></use>
              </svg>
              <span class='like_num'>${val.like_num ? `(${val.like_num})` : ''}</span>
            </div>`
  return str
}

// 点击了点赞添加点赞数
function dianzanSubmit(type, id, like_num, target){
  let numEle
  if(type === 'blog') {
    numEle = target.getElementsByClassName('like_num')[0]
  }
  var xmlHttp = $.XMLHttp()
  xmlHttp.onreadystatechange = function() {
    if(xmlHttp.readyState === 4) {
      if(xmlHttp.status === 200) {
        if(type === 'blog') {
          numEle.innerHTML = `(${like_num})`
        }else{
          target.innerHTML = `(${like_num})`
        }
      }
    }
  }
  // 点赞博客
  if(type === 'blog') {
    xmlHttp.open('post', '/likeBlog')
    xmlHttp.send(JSON.stringify({id: id, like_num: like_num}))
  }else{ // 点赞评论
    xmlHttp.open('post', '/likeComment')
    xmlHttp.send(JSON.stringify({id: id, like_num: like_num}))
  }
}