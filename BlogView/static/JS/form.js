/**
 * 
 * @param {*string} ref 目标表单的ref属性
 * 
 */
var form = (function(w){
  return {
    checkForm: function(ref) {
      // 获取所有form元素
      var form = document.getElementsByTagName('form')
      var targetForm;
      var flag = [];//标记是否所有项都符合规则
      // 循环获取目标表格
      for(var i = 0; i < form.length; i++){                
        if(form[i].getAttribute('ref') === ref){
          targetForm = form[i]
        }
       
      }
      // 获取表单内的所有输入框
      var input = targetForm.getElementsByTagName('input')
      for(var i =0; i<input.length; i++) {
        flag[i] = true
      }
      for(var i=0; i<input.length; i++) {
        // 判断是否为必填/选项
        var lanRequired = input[i].getAttribute('lanrequired')
        if(lanRequired!==null) {
          if(lanRequired != 'false'){
            // 显示错误提示
            var lanMin = input[i].getAttribute('lanmin') // 最小长度
            var lanMax = input[i].getAttribute('lanmax')
            var lanMessage = input[i].getAttribute('lanmessage') // 错误提示语
            var parent = input[i].parentElement
            var value = input[i].value
            this.deleteTips(parent, i)
            if(lanMin === null || lanMin === '' ||lanMin === undefined){ // 当该向为必填时，不能为空，当用户未设置规定长度且未定义错误提示
              if(lanMessage === null || lanMessage === undefined ) {
                lanMessage = '此项为必填项'
              }              
              if(value.length > 0) {
                flag[i] = true
                this.deleteTips(parent, i)
              }else{
                this.createTips(lanMessage, i, parent)
                flag[i] = false
              } 
            }else{ // 判断是否符合用户定义的长度范围
              console.log("lanMax");
              console.log(lanMax);
              
             
              if(lanMax === null || lanMax === '' || lanMax === undefined){ // 没有规定了最大长度
                if(lanMessage === null || lanMessage === undefined ) {
                  lanMessage = '不少于' + lanMin + '个字符'
                }
                if(value.length < parseInt(lanMin)) { //未符合要求                  
                  flag[i] = false
                  this.createTips(lanMessage, i, parent)
                }else{ // 符合要求
                  flag[i] = true
                  this.deleteTips(parent, i)
                }
              }else{ // 规定了最大长度
                if(lanMessage === null || lanMessage === undefined ) {
                  lanMessage = '字符长度为' + lanMin + '~' + lanMax + '之间'
                }
                if(value.length < parseInt(lanMin) || value.length > parseInt(lanMax)){
                  this.createTips(lanMessage, i, parent)
                  flag[i] = false
                }
              }

            }
          }
        }
      } 
      console.log('flag1');
      console.log(flag);
      
      return flag; // 返回判断是否全部填写正确    
    },
    createTips: function(lanMessage, i, parent) {
      var div = document.createElement('div')
      var span1 = document.createElement('span')
      var span2 = document.createElement('span')
      span1.innerHTML = '&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;'
      span2.innerHTML = lanMessage
      div.className = 'tips'
      div.id = 'tips' + i
      div.append(span1)
      div.append(span2)
      parent.append(div)
      // return div
    },
    deleteTips: function(parent, i) {
      var tipsId = 'tips' + i
      var tipsElement = document.getElementById(tipsId)
      if(tipsElement) { // 判断是否已存在提示
        parent.removeChild(tipsElement)
      }
    }
  }
})(window)
export default form