var marked  = require('marked')
var twemoji = require("./twemoji.js")
var hljs = require("highlight.js")
var base64 = require('./base64.js')
var renderToString = require("./katex_render.js")


function unescape(html) {
  return String(html)
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, '\'')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&amp;/g, '&')
    .replace(/<\/?em>/g,'_')
}


var editormd = {};
editormd.init = function(markdownToC,options){
    var self = editormd;
    marked.setOptions({
        renderer: self.markedRenderer(markdownToC,options),
        gfm: true,
        tables: true,
        breaks: false,
        pedantic: false,
        sanitize: false,
        smartLists: true,
        smartypants: false,
    });

    return marked;
};

/* 增加 extend */
void function(global){
    var extend,
        _extend,
        _isObject;

    _isObject = function(o){
        return Object.prototype.toString.call(o) === '[object Object]';
    }

    _extend = function self(destination, source) {
        var property;
        for (property in destination) {
            if (destination.hasOwnProperty(property)) {

                // 若destination[property]和sourc[property]都是对象，则递归
                if (_isObject(destination[property]) && _isObject(source[property])) {
                    self(destination[property], source[property]);
                };

                // 若sourc[property]已存在，则跳过
                if (source.hasOwnProperty(property)) {
                    continue;
                } else {
                    source[property] = destination[property];
                }
            }
        }
    }

    extend = function(){
        var arr = arguments,
            result = {},
            i;

        if (!arr.length) return {};

        for (i = arr.length - 1; i >= 0; i--) {
            if (_isObject(arr[i])) {
                _extend(arr[i], result);
            };
        }

        arr[0] = result;
        return result;
    }

    global.extend = extend;
}(editormd)


editormd.urls = {
    atLinkBase : "https://github.com/"
};

editormd.classPrefix  = "editormd-";

editormd.classNames  = {
    tex : editormd.classPrefix + "tex"
};

editormd.defaultLang =  'cpp';


editormd.regexs = {
    atLink        : /@(\w+)/g,
    email         : /(\w+)@(\w+)\.(\w+)\.?(\w+)?/g,
    emailLink     : /(mailto:)?([\w\.\_]+)@(\w+)\.(\w+)\.?(\w+)?/g,
    emoji         : /:([\w\+-]+(::){0,1}[\w\+-]+):/g,
    emojiDatetime : /(\d{2}:\d{2}:\d{2})/g,
    fontAwesome   : /:(fa-([\w]+)(-(\w+)){0,}):/g,
    editormdLogo  : /:(editormd-logo-?(\w+)?):/g,
    pageBreak     : /^\[[=]{8,}\]$/,
    video         : /\[(\w+)\]\(([\s\S]+)\)/,
    image         :/=([\d]+)[xX]{1}([\d]+)$/
};


var trim = function(str) {
    return (!String.prototype.trim) ? str.replace(/^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g, "") : str.trim();
};

editormd.trim = trim;

    /**
     * 自定义marked的解析器
     * Custom Marked renderer rules
     *
     * @param   {Array}    markdownToC     传入用于接收TOC的数组
     * @returns {Renderer} markedRenderer  返回marked的Renderer自定义对象
     */

editormd.markedRenderer = function(markdownToC, options) {
    var defaults = {
        toc                  : true,           // Table of contents
        tocm                 : false,
        tocStartLevel        : 1,              // Said from H1 to create ToC
        pageBreak            : true,
        atLink               : true,           // for @link
        emailLink            : true,           // for mail address auto link
        taskList             : true,          // Enable Github Flavored Markdown task lists
        emoji                : true,          // :emoji: , Support Twemoji, fontAwesome, Editor.md logo emojis.
        codeCopy             : true,          // 开启代码复制支持
        tex                  : true,          // TeX(LaTeX), based on KaTeX
        flowChart            : true,          // flowChart.js only support IE9+
        sequenceDiagram      : false,          // sequenceDiagram.js only support IE9+
        image                : false,         // 增强image 能力
        image_base           : '/'            //地址
    };

    var settings = editormd.extend(defaults, options|| {});
    var regexs          = editormd.regexs;
    var atLinkReg       = regexs.atLink;
    var emojiReg        = regexs.emoji;
    var emailReg        = regexs.email;
    var emailLinkReg    = regexs.emailLink;
    var faIconReg       = regexs.fontAwesome;
    var editormdLogoReg = regexs.editormdLogo;
    var pageBreakReg    = regexs.pageBreak;
    var videoReg        = regexs.video;
    var imageReg        = regexs.image;

    markdownToC         = markdownToC || [];
    var markedRenderer= new marked.Renderer();

    markedRenderer.emoji = function(text) {
        text = text.replace(editormd.regexs.emojiDatetime, function($1) {
            return $1.replace(/:/g, "&#58;");
        });

        var matchs = text.match(emojiReg);

        if (!matchs || !settings.emoji) {
            return text;
        }

        for (var i = 0, len = matchs.length; i < len; i++)
        {
            if (matchs[i] === ":+1:") {
                matchs[i] = ":\\+1:";
            }

            text = text.replace(new RegExp(matchs[i]), function($1, $2){
              var name = $1

              var real_name = name.slice(1)
              real_name = real_name.slice(0,-1)

              var uri = twemoji.parse(name)

              if(uri !== name)
                return "<img src=\"" + uri + "\" class=\"emoji\" title=\"&#58;" + real_name+ "&#58;\" alt=\"&#58;" +  real_name + "&#58;\" />";
            });
        }

        return text;
    };


    markedRenderer.atLink = function(text) {

        if (atLinkReg.test(text))
        {
            if (settings.atLink)
            {
                text = text.replace(emailReg, function($1, $2, $3, $4) {
                    return $1.replace(/@/g, "_#_&#64;_#_");
                });

                text = text.replace(atLinkReg, function($1, $2) {
                    return "<a href=\"" + editormd.urls.atLinkBase + "" + $2 + "\" title=\"&#64;" + $2 + "\" class=\"at-link\">" + $1 + "</a>";
                }).replace(/_#_&#64;_#_/g, "@");
            }

            if (settings.emailLink)
            {
                text = text.replace(emailLinkReg, function($1, $2, $3, $4, $5) {
                    return (!$2 && "jpg|jpeg|png|gif|webp|ico|icon|pdf".split("|").indexOf($5) < 0) ? "<a href=\"mailto:" + $1 + "\">"+$1+"</a>" : $1;
                });
            }

            return text;
        }

        return text;
    };


    markedRenderer.link = function (href, title, text) {

        if (this.options.sanitize) {
            try {
                var prot = decodeURIComponent(unescape(href)).replace(/[^\w:]/g,"").toLowerCase();
            } catch(e) {
                return "";
            }

            if (prot.indexOf("javascript:") === 0) {
                return "";
            }
        }

        var out = "<a href=\"" + href + "\"";

        if (atLinkReg.test(title) || atLinkReg.test(text))
        {
            if (title)
            {
                out += " title=\"" + title.replace(/@/g, "&#64;");
            }

            return out + "\">" + text.replace(/@/g, "&#64;") + "</a>";
        }

        if (title) {
            out += " title=\"" + title + "\"";
        }

        out += ">" + text + "</a>";

        return out;
    };

    markedRenderer.heading = function(text, level, raw) {

        var linkText       = text;
        var hasLinkReg     = /\s*\<a\s*href\=\"(.*)\"\s*([^\>]*)\>(.*)\<\/a\>\s*/;
        var getLinkTextReg = /\s*\<a\s*([^\>]+)\>([^\>]*)\<\/a\>\s*/g;

        if (hasLinkReg.test(text))
        {
            var tempText = [];
            text         = text.split(/\<a\s*([^\>]+)\>([^\>]*)\<\/a\>/);

            for (var i = 0, len = text.length; i < len; i++)
            {
                tempText.push(text[i].replace(/\s*href\=\"(.*)\"\s*/g, ""));
            }

            text = tempText.join(" ");
        }

        text = trim(text);

        var escapedText    = text.toLowerCase().replace(/[^\w]+/g, "-");
        var toc = {
            text  : text,
            level : level,
            slug  : escapedText
        };

        var isChinese = /^[\u4e00-\u9fa5]+$/.test(text);
        var id        = (isChinese) ? escape(text).replace(/\%/g, "") : text.toLowerCase().replace(/[^\w]+/g, "-");

        markdownToC.push(toc);

        var headingHTML = "<h" + level + " id=\"h"+ level + "-" + this.options.headerPrefix + id +"\">";

        headingHTML    += "<a name=\"" + text + "\" class=\"reference-link\"></a>";
        headingHTML    += "<span class=\"header-link octicon octicon-link\"></span>";
        headingHTML    += (hasLinkReg) ? this.atLink(this.emoji(linkText)) : this.atLink(this.emoji(text));
        headingHTML    += "</h" + level + ">";

        return headingHTML;
    };

    markedRenderer.pageBreak = function(text) {
        if (pageBreakReg.test(text) && settings.pageBreak)
        {
            text = "<hr style=\"page-break-after:always;\" class=\"page-break editormd-page-break\" />";
        }

        return text;
    };

    markedRenderer.paragraph = function(text) {
        var isTeXInline     = /\$\$(.*)\$\$/g.test(text);
        var isTeXLine       = /^\$\$(.*)\$\$$/.test(text);
        var isTeXAddClass   = (isTeXLine)? " class=\"" + editormd.classNames.tex + "\"" : "";
        //var isToC           = (settings.tocm) ? /^(\[TOC\]|\[TOCM\])$/.test(text) : /^\[TOC\]$/.test(text);
        var isToC = false;
        var isToCMenu       = /^\[TOCM\]$/.test(text);

        if (!isTeXLine && isTeXInline)
        {
            text = text.replace(/(\$\$([^\$]*)\$\$)+/g, function($1, $2) {
                var m_code = $2.replace(/\$/g, "");
                //console.log(m_code)
                m_code = unescape(m_code);
                return "<span class=\"" + editormd.classNames.tex + "\">" +
                renderToString(m_code)
                +
                "</span>";
            });
        }
        else if(isTeXLine){
                //console.log(text)
                text = unescape(text.replace(/\$/g, ""))
                text =  renderToString(text)

        }
            //text = (isTeXLine) ? text.replace(/\$/g, "") : text;

        var tocHTML = "<div class=\"markdown-toc editormd-markdown-toc\">" + text + "</div>";

        return (isToC) ? ( (isToCMenu) ? "<div class=\"editormd-toc-menu\">" + tocHTML + "</div><br/>" : tocHTML )
            : ( (pageBreakReg.test(text)) ? this.pageBreak(text) : "<p" + isTeXAddClass + ">" + this.atLink(this.emoji(text)) + "</p>\n" );
    };


    markedRenderer.code = function (code, lang, escaped) {

        if ( lang === "math" || lang === "latex" || lang === "katex")
        {
          //console.log(code)
            var m_code = unescape( code);
          //console.log(m_code)
          m_code = renderToString(m_code);
            return "<p class=\"" + editormd.classNames.tex + "\">" + m_code + "</p>";
        }
        else if( lang === "video"){
            if( videoReg.test(code)){
              var video_item = code.match(videoReg)
              var route = video_item[1];
              var video_path = video_item[2];
              var m_code = "route="+route+"&path="+video_path;
            return '<video name="videoElement" width=\"500\" height=\"280\" poster="/images/video.png" autoplay value="'+m_code+'">'+ 'Your browser does not support the video tag.</video>'+ '<br>';
            }
            return "<p>!!!!!video 格式写错 </p>"
        }
        else if(lang !== "" && lang !== undefined){
          //console.log("lang")
          //console.log(lang)
          var __code =  hljs.highlight(lang,code).value;
          //code copy
          var cp_code = base64.encode(code)
          var copy_str  =  "<div class=\"code-copy\"><button data-copy=\""+cp_code+"\"onclick=\"clipboardCopy(this)\">复制<p>Copy to clipbord!</p></button></div>"

          return "<pre class=\"hljs\">"+copy_str+"<code class=\""+lang+" hljs\">\n" +__code +"</code></pre>"
        }
        else
        {

            var code = marked.Renderer.prototype.code.apply(this, arguments);
            var reg = /^<pre><code class="(.*)">/
            if( reg.test(code)){
                var new_code = code.replace(reg,'<pre class="prettyprint linenums"><code>')
                return new_code;
            }
            else
                return code;

        }
    };

    markedRenderer.tablecell = function(content, flags) {
        var type = (flags.header) ? "th" : "td";
        var tag  = (flags.align)  ? "<" + type +" style=\"text-align:" + flags.align + "\">" : "<" + type + ">";

        return tag + this.atLink(this.emoji(content)) + "</" + type + ">\n";
    };

    markedRenderer.listitem = function(text) {
        var res = "";
        if (settings.taskList && /^\s*\[[x\s]\]\s*/.test(text))//github list
        {
            text = text.replace(/^\s*\[\s\]\s*/, "<input type=\"checkbox\" class=\"task-list-item-checkbox\" /> ")
                .replace(/^\s*\[x\]\s*/,  "<input type=\"checkbox\" class=\"task-list-item-checkbox\" checked disabled /> ");

            res =  "<li style=\"list-style: none;\">" + this.atLink(this.emoji(text)) + "</li>";
        }
        else
        {
            res= "<li>" + this.atLink(this.emoji(text)) + "</li>";
        }

        /* 渲染math*/
        var isTeXInline     = /\$\$(.*)\$\$/g.test(res);
        var isTeXLine       = /^\$\$(.*)\$\$$/.test(res);

        //console.log(res)
        if (!isTeXLine && isTeXInline)
        {
            res = res.replace(/(\$\$([^\$]*)\$\$)+/g, function($1, $2) {
                var m_code = $2.replace(/\$/g, "");
                //console.log(m_code)
                m_code = unescape(m_code);
                return "<span class=\"" + editormd.classNames.tex + "\">" + 
                renderToString(m_code)
                + "</span>";
            });
        }
        else if(isTeXLine){
                //console.log(text)
                res = unescape(res.replace(/\$/g, ""))
                res = renderToString(res)
        }

        return res;
    };

    markedRenderer.image = function(href,title,text){
      if(settings.image){  //开启了
        var image = '<img src=\"image_path\" alt=\"--alt--\" title=\"--title--\" height width/>'
        
        var href_isabsolute = false
        if(href== '' || href ==null || href==undefined){
          href=''
        }
        else if(href.substr(0,4) == 'http' || href[0] == '/')
          href_isabsolute = true;

        if(href != '' && href_isabsolute == false){
          href = settings.image_base + href
        }

        title = title || ''
        alt = text || ''

        var height = ''
        var width  = ''
        var href_match = href.match(imageReg)
        if( href != '' && href_match){
           href=href.replace(imageReg,'')
          height = "height="+href_match[1]
          width  = "width="+href_match[2]
        }

         image =image.replace('height',height)
                    .replace('width',width)
                    .replace('--alt--',alt)
                    .replace('--title--',title)
                    .replace('image_path',href)


        return image
      }
      return marked.Renderer.prototype.image.apply(this, arguments);
    }
  return markedRenderer
}


module.exports = editormd
