# rmarked

## 功能使用

引入样式

```
import "rmarked/css/github-markdown.css"
import "katex/dist/katex.min.css"

//引入高亮的主题,可以改成自己喜欢的
import "highlight.js/styles/tomorrow-night-blue.css"

//全局使用

var markdown = require("rmarked")
Vue.prototype.markdown_render = markdown

```

## 配置


opttions
```
{
    katex:true,
    emoji:true,
    extImage:true, //对image的增强
    Imagebase:'' //image基础地址
}

```

### Emoji表情的使用

使用**TWEmoji**

语法

```
:emoji-code:
```

**emoji-cheatsheet**

https://jollygoodcode.github.io/twemoji/

## image 


```
![text](imagepath=heightxwidth "title")
![text](./image.jpg=100x100 "myimage")
```
