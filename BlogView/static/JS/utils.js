var $ = (function(w) {
  return {
    clientWidth: function() {
      let width = document.documentElement.clientWidth
      return width
    },
    clientHeight: function() {
      let height = document.documentElement.clientHeight
      return height
    },
    XMLHttp: function() {
      if(w.XMLHttpRequest) {
        return new XMLHttpRequest()
      }else{
        return new ActiveXObject('Microsoft.XMLHTTP')
      }
    }
  }
})(window)
export default $