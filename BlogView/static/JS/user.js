window.onload = function() {
  var href = window.location.href
  console.log('href');
  console.log(href);
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
}