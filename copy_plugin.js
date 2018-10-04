var  clipboard_polyfill  = require("clipboard-polyfill/build/clipboard-polyfill.promise")
var copy_2_clipboard= function(self){
    let content = (self.getAttribute("data-code"))
    clipboard.writeText(content).then(function(){

        let ele = self.getElementsByTagName("span")[0]
        ele.className += ' tooltiptext-show'

        setTimeout(function(){
            ele.className = ele.className.replace(' tooltiptext-show','')
        },1000)
    },function(){
        console.log("fail")
    })
}

module.exports = copy_2_clipboard
