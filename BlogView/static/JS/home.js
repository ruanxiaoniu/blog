import $ from './utils.js'
import { getToken } from '../../localStorage/index.js'
window.onload = function() {
  var user = document.getElementsByClassName('user')[0]
  var menu = document.getElementsByClassName('menu')[0]
  var blog = document.getElementById('centerIframe')
  // 初始化 blog高度
  getBlogHeight(blog)
  // 获取导航栏最后图标所在位置，用来设置悬浮时菜单显示位置
  getMenu(user, menu)
  window.onresize = function() {
    getBlogHeight(blog)
    getMenu(user, menu)
  } 
  
  // 点击导航栏
  var nav = document.getElementById('nav')
  var blog = document.getElementById('centerIframe')
  nav.addEventListener('click', function(ev) {
    let event = ev || window.event // (ie的是window.event)
    let target = event.target || event.srcElement // (ie的是event.srcElement)
    if(target.tagName === 'LI'){
      if(target.id === 'home') {
        blog.src= './views/blog.html'
        document.title = 'YAOLAN'
      }
      else if(getToken()) {
        if(target.id === 'myConcern') {
          blog.src = './views/user.html?tab=myconcer'
          document.title = '我的关注'
        }else if(target.id === 'myFans') {
          blog.src = './views/user.html?tab=myFans'
          document.title = '我的粉丝'
        }
      }else{
        alert('请登录！')
      }
    }
  })
  
  // 监听点击鼠标图标
  user.addEventListener('click', function(ev) {    
    menu.style.display = 'inline'
    ev.stopPropagation()
  })

  // 监听点击首页body
  document.body.addEventListener('click', function(ev) {
    menu.style.display = 'none'
  })
  
  // 点击menu
  menu.addEventListener('click', function(ev) {
    let target = ev.target
    if(target.tagName === 'LI'){
      // 处理操作
      handle(target.id, blog)
    }
    
  })
  
}
// 设置iframe大小
function getBlogHeight(blog) {
  // 浏览器可视宽高

  var clientWidth = $.clientWidth()
  var clientHeight = $.clientHeight()
  // 获取home中header, footer高度
  var headerHeight = document.getElementsByTagName('header')[0].offsetHeight
  var footerHeight = document.getElementsByTagName('footer')[0].offsetHeight
  // 剩余浏览器可视高度（blog高度）
  // console.log(headerHeight);
  var blogHeight = clientHeight - headerHeight - footerHeight
  // 获取iframe对象
  blog.style.height = blogHeight + 'px'  
}

// 设置导航栏最后菜单大小
function getMenu(user, menu){
  var userMarginLeft = window.getComputedStyle(user).marginLeft
  var menuLeft = user.offsetLeft - user.offsetWidth
  menu.style.left = menuLeft + 'px'
  menu.style.marginLeft = userMarginLeft
  menu.style.top = user.offsetTop + 'px'  
}

// 点击菜单处理
function handle(id, blog) {
  if(id === 'login') {
    window.open('./views/login.html', '_blank')
  }else if(id === 'personCenter') {
    if(getToken()) {
      blog.src = './views/user.html?tab=personalInfo'
      document.title = '个人中心'
    }else{
      alert('请登录！')
    }
  }
}
