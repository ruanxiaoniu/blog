import $ from './utils.js'
import Form from './form.js'
window.onload = function() {
  var login = document.getElementsByClassName('login')[0]
  var register = document.getElementsByClassName('register')[0]
  var login_title = document.getElementById('login_title')
  var regist_title = document.getElementById('regist_title')
  var login_submit = document.getElementById('login_submit')
  var regist_submit = document.getElementById('regist_submit')
  register.style.display = 'none'
  login.style.display = 'inline'
  login_title.style.borderBottom = '2px solid rgb(238, 160, 15)'
  regist_title.style.borderBottom = '0px'

  // 监听点击
  login_title.addEventListener('click', function(ev) {    
    register.style.display = 'none'
    regist_title.style.borderBottom = '0px'
    login.style.display = 'block'
    login_title.style.borderBottom = '2px solid rgb(238, 160, 15)'
   
  })
  regist_title.addEventListener('click', function(ev){
    login.style.display = 'none'
    login_title.style.borderBottom = '0px'
    register.style.display = 'block'
    regist_title.style.borderBottom = '2px solid rgb(238, 160, 15)'
  })

  // 登录
  login_submit.addEventListener('click', function(ev) {
    // 获取账号和密码
    var username = document.getElementById('username_input').value
    var password = document.getElementById('password_input').value    
    var data = {
      'username': username,
      'password': password
    }
    var xmlHttp = $.XMLHttp();
    var res;
    xmlHttp.onreadystatechange = function() {
      if(xmlHttp.readyState == 4) {
        if(xmlHttp.status === 200) {
          if(xmlHttp.responseText){
            res = JSON.parse(xmlHttp.responseText)
            console.log(res);
            if(res.code === 0){
              alert('登录成功！')
              window.open('/', '_self')
            }else if(res.code === -1) {
              alert(res.message)
            }else if(res.code === -2) {
              alert(res.message)
            }
          }  
        }
      }
    }    
    xmlHttp.open('post', '/login', true)
    xmlHttp.send(JSON.stringify(data))
  })

  // 注册
  regist_submit.addEventListener('click', function(ev) {
   var flag = Form.checkForm('register')
   var registpassword = document.getElementById('registpassword_input')
   var repassword = document.getElementById('repassword_input')
   var submitFlag = true
   if(registpassword.value === repassword.value) {
     for(var i=0; i<flag.length; i++) {
       if(!flag[i]) {
         submitFlag = false
       }
     }     
   }else{
     repassword.value = ''
     flag = Form.checkForm('register')
   }
   if(submitFlag){
     var registusername = document.getElementById('registusername')
     var sex = ''
     var radios = document.getElementsByName('sex')
     for(var i=0;i < radios.length; i++) {
      console.log(radios[i].checked);
       if(radios[i].checked == true) {
         sex = radios[i].value
       }
     }
     var data = {
       username: registusername.value,
       password: registpassword.value,
       sex: sex
     }
     var xmlHttp = $.XMLHttp()
     var res;
     xmlHttp.onreadystatechange = function() {
       if(xmlHttp.readyState == 4) {
         if(xmlHttp.status === 200){
          if(xmlHttp.responseText){
            res = JSON.parse(xmlHttp.responseText)
            console.log('res.code');
            console.log(res);
            
            if(res.code === 0) {
              alert('注册成功！')
              // 跳转至登录页
              window.open('/views/login.html', '_self')
            }else{
             alert('注册失败，请重试！')
            }
          }
         } 
        }
     }
     console.log('data');
     console.log(data);
     
     xmlHttp.open('post', '/register', true)
     xmlHttp.send(JSON.stringify(data))
   }
  })
}

