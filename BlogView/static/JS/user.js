window.onload = function() {
  var href = window.location.href
  var paramObj = href.split('?')[1]
  var param = paramObj.split('=')[1]
  var info = document.getElementById('info')
  var myconcer = document.getElementById('myconcer')
  var aside = document.getElementsByTagName('aside')[0]

  console.log('我的关注');
  console.log(aside.offsetTop);
  info.style.marginTop = aside.offsetTop + 2 + 'px'
  if(param === 'myconcer'){
    console.log('info');
    console.log(info);
    info.src = './myConcern.html'
    myconcer.className = 'liColor'
  }else if(param ==='myFans') {
    info.src = './myFans.html'
    myFans.className = 'liColor'
  }
}