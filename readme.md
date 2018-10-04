# rmarked

## 特点

 - [x] 解析`html`标签
 - [x] 解析link-like
 - [x] 解析打印字符`© © ® ® ™ ™ § § ±`,`(c) (C) (r) (R) (tm) (TM) (p) (P) +-`
 - [x] 设定图的大小,居中
 - [x] 解析 Latex 数学公式
    - [x] 行内:`$ a+b = 1$`
    - [x] 整行:`$$ a+b=1$$`
    - [x] 单独:` \`\`\`math a+b = 1`
 - [ ] 代码高亮
    - [x] 行号
    - [x] 复制
    - [ ] 折叠
 - [x] emoji 表情
 - [x] Toc
 - [x] 支持 table
 - [x] 支持 删除线
 - [x] 上标 下标
 - [x] 引用
 - [ ] insert text
 - [ ] marked text
 - [ ] Abbreviations
 - [ ] container
 - [ ] footernotes
 - [ ] Definition lists
 - [x] markdown-it-multimd-table
 - [x] markdown-it-smartarrows
 - [ ] markdown-it-cjk-breaks
 - [x] markdown-it-katex
 - [x] task-lists

## 功能使用

###　引入样式

方法1: 在网页引入

```html
<link href="https://cdnjs.cloudflare.com/ajax/libs/KaTeX/0.9.0/katex.min.css" rel="stylesheet">
<link href="https://cdnjs.cloudflare.com/ajax/libs/highlight.js/9.12.0/styles/default.min.css" rel="stylesheet" id="theme-id">
```

在main.js中引入
```
import "rmarked/css/github-markdown.css"
import "katex/dist/katex.min.css"

//引入高亮的主题,可以改成自己喜欢的
import "highlight.js/styles/tomorrow-night-blue.css"

//全局使用

var markdown = require("rmarked").render
Vue.prototype.markdown_render = markdown
```

## 配置

不需要配置

## Emoji表情的使用

使用**TWEmoji**

语法

```
:emoji-code:
```

如果使用它,引用下面的`script`

```html
<script src="//twemoji.maxcdn.com/2/twemoji.min.js?11.2"></script>
```

**emoji-cheatsheat**


cheat_sheat 地址

- http://rainboy.coding.me/twemoji_cheat_sheet
- https://jollygoodcode.github.io/twemoji/

## image 

语法
```
![text](you_image_path =widthxheigh)
```

## 使用copy_2_clipboard

这里使用了这个代码:[clipboard-polyfill](https://github.com/lgarron/clipboard-polyfill)

复制[build/clipboard-polyfill.promise.js](https://raw.githubusercontent.com/lgarron/clipboard-polyfill/master/build/clipboard-polyfill.promise.js) 在网页里用` <script>`标签包含

## 代码高亮的主题

在网页里引用的不同的`highlight.js`的主题`css`

## 参考

 - http://bellido.us/blog/07-06-2014-Adding-LineNumbers-highlight-js.html
 - https://github.com/zenorocha/clipboard.js.git
 - https://github.com/lgarron/clipboard-polyfill
