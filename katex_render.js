var katex = require('katex')

module.exports = function(str){
  try{
    return katex.renderToString(str,{
      throwOnError:false,
      errorColor:"#f00"
    })
  }
  catch(e){
    return "<p class=\"math-error\">"+e.name+"</p>"
  }
}
