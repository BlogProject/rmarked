var rmarked = require('./rmarked.js')


// 设定
// settings.emoji
// fa.emoji
// 


/*   设定选项： 查看marked 的选项
 * 
 * */
module.exports = function(options){


  var _markdown = rmarked.init()

  return function(str){
    if(str === "" || str === undefined || str ===null) 
      return ""
    else 
      return _markdown(str)
  }
}
