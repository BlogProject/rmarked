var rmarked = require('./rmarked.js')
var clipboardCopy = require('./clipbordCopy.js')


// 设定
// settings.emoji
// fa.emoji
// 


/*   设定选项： 查看marked 的选项
 * 
 * */
module.exports = function(options){

  var _markdown = rmarked.init()
  //初始化
  window.clipboardCopy = clipboardCopy
  return function(str){
    if(str === "" || str === undefined || str ===null) 
      return ""
    else 
      return _markdown(str)
  }
}
