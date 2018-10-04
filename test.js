var md = require("./index.js")
var fs = require("fs")

function read(path){
    return fs.readFileSync(path,{encoding:"utf-8"})
}
console.log( md.render.call(md,read("./fence.md")))
