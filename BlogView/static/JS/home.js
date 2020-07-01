import $ from './utils.js'
window.onload = function() {
  // 浏览器可视宽高
  var clientWidth = $.clientWidth()
  var clientHeight = $.clientHeight()
  // 初始化 blog高度
  getBlogHeight(clientWidth, clientHeight)
  // console.log(clientWidth, clientHeight);
  window.onresize = function() {
    clientWidth = $.clientWidth()
    clientHeight = $.clientHeight()
    getBlogHeight(clientWidth, clientHeight)
    // console.log(clientWidth, clientHeight);
  } 
  // 点击导航栏
  var nav = document.getElementById('nav')
  var blog = document.getElementById('centerIframe')
  nav.addEventListener('click', function(ev) {
    console.log('ev');
    console.log(ev);
    console.log(ev.target);
    let target = ev.target
    if(target.tagName === 'LI'){
      if(target.id === 'home') {
        console.log(blog.src);
        blog.src= './views/blog.html'
        document.title = 'YAOLAN'
      }else if(target.id === 'myConcern') {
        blog.src = './views/user.html'
        document.title = '我的关注'
      }
    }
  })

  // 监听iframe是否加载完成
  
}
function getBlogHeight(clientWidth, clientHeight) {
  // 获取home中header, footer高度
  var headerHeight = document.getElementsByTagName('header')[0].offsetHeight
  var footerHeight = document.getElementsByTagName('footer')[0].offsetHeight
  // 剩余浏览器可视高度（blog高度）
  // console.log(headerHeight);
  var blogHeight = clientHeight - headerHeight - footerHeight
  console.log(blogHeight);
  // 获取iframe对象
  var blog = document.getElementById('centerIframe')
  blog.style.height = blogHeight + 'px'
  console.log(blog.offsetHeight);
  
}

