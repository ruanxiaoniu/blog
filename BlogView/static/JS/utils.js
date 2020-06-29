var $ = (function(w) {
  return {
    clientWidth: function() {
      let width = document.documentElement.clientWidth
      return width
    },
    clientHeight: function() {
      let height = document.documentElement.clientHeight
      return height
    }
  }
})(window)
export default $