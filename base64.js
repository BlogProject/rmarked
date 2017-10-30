var base_64 = require("base-64")
var utf8 = require("utf8")
var base64 = {}

base64.encode = function(str){
  var bytes = utf8.encode(str);
  return  base_64.encode(bytes);
}

base64.decode = function(encoded){
  var bytes = base_64.decode(encoded);
  return utf8.decode(bytes);
}

module.exports = base64

exports.init = function(){
  window.base64 = base64;
}
