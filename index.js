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
  //初始化
  if (typeof module !== 'undefined' && module.exports)
    ;
  else
    window.clipboardCopy = clipboardCopy

  var _markdown = rmarked.init()
  return function(str){
    if(str === "" || str === undefined || str ===null) 
      return ""
    else 
      return _markdown(str)
  }
}
