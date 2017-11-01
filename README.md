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


默认opttions 
```
{
    katex:true,
    emoji:true,
    image:false, //对image的增强
    image_base:'/' //image基础地址
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

image可以使用以通过opttions开启增强的功能,默认没有开启`image:false`,使用`marked`的默认功能

**image_base**
开启image增加的同时,改变图片相对地址的基地址


语法
```
![text](you_image_path=HeightxWidth"title")
```

例子:

开启增强image功能,改变image_base

```
{
    image:true,
    image_base:'http://rainboy.com/'
}
```

```
原:
![1](1/2/3.jpg=100x200 "mytitle")

渲染后:

<img src="http://rainboy.com/1/2/3.jpg" title="mytitle" alt="1" height=100 width=200 />
```

如果原地址是绝对地址就是不会加入基地址:

```
![2](/1/2/3.jpg=100x200 "mytitle")
==> <img src="/1/2/3.jpg" title="mytitle" alt="2" height=100 width=200 />

![3](http://rainboy.com/1/2/3.jpg=100x200 "mytitle")
<img src="http://rainboy.com/1/2/3.jpg" title="mytitle" alt="2" height=100 width=200 />
```

height width是选的,但是两个必须同时写上

```
![4](/1/2/3.jpg "mytitle")
==> <img src="/1/2/3.jpg" title="mytitle" alt="2" />

![5](/1/2/3.jpg=100x "mytitle")
==> <img src="/1/2/3.jpg=100x" title="mytitle" alt="2" />
```
