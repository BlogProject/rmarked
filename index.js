var md= require("markdown-it")({
    html:true,
    linkify:true,
    typographer:true
})


var cjk_breaks = require('markdown-it-cjk-breaks');
var mdSmartArrows = require('markdown-it-smartarrows');
var imsize = require('markdown-it-imsize')
var mk = require('@iktakahiro/markdown-it-katex');
var hl = require("./hl.js")

md.use(cjk_breaks)
    .use(mdSmartArrows)
    .use(imsize)
    .use(mk)
    .use(require('markdown-it-task-lists'))
    .use(require('markdown-it-sub'))
    .use(require('markdown-it-sup'))
    .use(require('markdown-it-multimd-table'), {enableMultilineRows: true})
    .use(require("markdown-it-anchor"))
    .use(require("markdown-it-table-of-contents"))
    .use( require('markdown-it-emoji'))
    .use(require('markdown-it-footnote'))
    .use(hl)

/* 需要在前端引用 twemoji.js */
md.renderer.rules.emoji = function(token, idx) {
    return twemoji.parse(token[idx].content);
};


/* 这个部分: 在前端要手动加入 */
if( window)
    window.abbc = require("./copy_plugin.js")

module.exports = md
