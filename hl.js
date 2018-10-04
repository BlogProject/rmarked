var hljs = require("highlight.js")
var katex = require("katex")

function hl(md,opts){
    md.renderer.rules.fence  = function(tokens, idx, options, env, slf){
        let unescapeAll = md.utils.unescapeAll
        let escapeHtml= md.utils.escapeHtml

        let token = tokens[idx],
            info = token.info ? unescapeAll(token.info).trim() : '',
            langName = '',
            highlighted, i, tmpAttrs, tmpToken;

        if (info) {
            langName = info.split(/\s+/g)[0];
        }
        if( langName == 'math' ||  langName == 'katex' || langName == 'latex'){
            let math_str = katex.renderToString(token.content, {
                throwOnError: false,
                displayMode:true
            });

            return `<p class="katex-block">${math_str}</p>`
        }
        else if( langName == '' || langName == undefined)
            langName = 'plaintext'
    
        try{
            highlighted = hljs.highlight(langName,token.content).value 
        }
        catch(e){
            highlighted = escapeHtml(token.content);
        }
            


        // line Number
        let prefix = 'prefix';
        let l = 0;
        let result = highlighted.replace(/\n/g, function() {
            l++;
            return "\n" + '<a class="line" name="' + prefix + l + '">' + l + '</a>';
        })

        highlighted = '<a class="line" name="' + prefix + '0">0</a>' + result;

        //if (highlighted.indexOf('<pre') === 0) {
            //return highlighted + '\n';
        //}

        // If language exists, inject class gently, without modifying original token.
        // May be, one day we will add .clone() for token and simplify this part, but
        // now we prefer to keep things local.
        var clipboard_message = '<span class="tooltiptext">已复制</span>'
        if (langName) {
            let className = ' class="hljs'
            if(langName)
                className += ' '+langName
            className += '"'
            let data_code = 'data-code="'+escapeHtml(token.content) + '"'
            return  '<pre class="hljs-pre"><code' + className + '>' 
                + '<a class="pre-clipboard" title="复制" '+ data_code+' onclick="abbc(this)">'+ clipboard_message+'</a>'
                + highlighted
                + '</code></pre>\n';
        }


        return  '<pre><code' + '' + '>'
            + highlighted
            + '</code></pre>\n';

    }
}
module.exports = hl
