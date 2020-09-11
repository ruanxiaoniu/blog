window.onload = function() {
  var href = window.location.href
  var paramObj = href.split('?')[1]
  var param = paramObj.split('=')[1]
  var info = document.getElementById('info')
  var myconcer = document.getElementById('myconcer')
  var aside = document.getElementsByTagName('aside')[0]

  info.style.marginTop = aside.offsetTop + 2 + 'px'
  if(param === 'myconcer'){
    info.src = './myConcern.html'
    myconcer.className = 'liColor'
  }else if(param ==='myFans') {
    info.src = './myFans.html'
    myFans.className = 'liColor'
  }else if(param === 'personalInfo'){
    info.src = './personalInfo.html'
    personalInfo.className = 'liColor'
  }
  
  //点击左侧选项（个人资料，我的粉丝）
  var user = document.getElementById('user')
  user.addEventListener('click', function(ev) {
    let event = ev || window.event
    let target = event.target || event.srcElement
    if(target.tagName === 'LI') {
      let liArr = Array.from(user.getElementsByTagName('li'))
      console.log(liArr);
      // 先把所有的li样式清除
      liArr.forEach((item, index) => {
        item.className = ''
      })
      // 把目标样式加上
      target.className = 'liColor'
      let targetId = target.getAttribute('id')
      console.log('targetId');
      console.log(targetId);
      info.src = `./${targetId}.html`
    }
  })
}