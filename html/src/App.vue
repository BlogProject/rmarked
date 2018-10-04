<template>
  <div id="app">

    <div class="theme-panel">
    <span> 主题: </span>
    <select v-model="theme">
        <option v-for="op in themes" v-bind:value ="op">{{op}}</option>
    </select>
    </div>

    <textarea :value="input" @input="update"></textarea>
    <div class="markdown-body" v-html="compiledMarked"> </div>
  </div>
</template>

<script>
var rmarked = require("../../index.js")
export default {
  name: 'app',
  data () {
    return {
        theme:'default',
        themes: ['agate',
'androidstudio',
'arduino-light',
'arta',
'ascetic',
'atelier-cave-dark',
'atelier-cave-light',
'atelier-dune-dark',
'atelier-dune-light',
'atelier-estuary-dark',
'atelier-estuary-light',
'atelier-forest-dark',
'atelier-forest-light',
'atelier-heath-dark',
'atelier-heath-light',
'atelier-lakeside-dark',
'atelier-lakeside-light',
'atelier-plateau-dark',
'atelier-plateau-light',
'atelier-savanna-dark',
'atelier-savanna-light',
'atelier-seaside-dark',
'atelier-seaside-light',
'atelier-sulphurpool-dark',
'atelier-sulphurpool-light',
'atom-one-dark',
'atom-one-light',
'brown-paper',
'brown-papersq.png',
'codepen-embed',
'color-brewer',
'darcula',
'dark',
'darkula',
'default',
'docco',
'dracula',
'far',
'foundation',
'github-gist',
'github',
'googlecode',
'grayscale',
'gruvbox-dark',
'gruvbox-light',
'hopscotch',
'hybrid',
'idea',
'ir-black',
'kimbie.dark',
'kimbie.light',
'magula',
'mono-blue',
'monokai-sublime',
'monokai',
'obsidian',
'ocean',
'paraiso-dark',
'paraiso-light',
'pojoaque.jpg',
'pojoaque',
'purebasic',
'qtcreator_dark',
'qtcreator_light',
'railscasts',
'rainbow',
'routeros',
'school-book',
'school-book.png',
'solarized-dark',
'solarized-light',
'sunburst',
'tomorrow-night-blue',
'tomorrow-night-bright',
'tomorrow-night-eighties',
'tomorrow-night',
'tomorrow',
'vs',
'vs2015',
'xcode',
'xt256',
'zenburn'],
      input:"# hello",
      last:null,
    }
  },
  mounted(){
      this.input = MARKDOWN
  },
 watch:{
     theme(n,o){
         let themeCss=document.getElementById("theme-id");
         themeCss.href = `https://cdnjs.cloudflare.com/ajax/libs/highlight.js/9.12.0/styles/${n}.min.css`
     }
 },
  methods:{
    update(e){
      let self = this
      clearTimeout(self.last)
      self.last = setTimeout(function(){ 
        self.input = e.target.value 
      },500)

    }
  },
  computed:{
    compiledMarked(){
      let self = this
      return rmarked.render.call(rmarked,self.input)
    }
  }
}
</script>

<style>
html,body,#app {
  margin:0;
  height:100%;
  color:#333;
}
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  margin-top: 20px;
}

textarea, #app div {
  display:inline-block;
  width:49%;
  height:auto;
  min-height:1000px;
  vertical-align:top;
  box-sizing:border-box;
  padding:0 20px;
  border:1px solid #eee;
}
div.theme-panel {
    background:#eee;
    border:1px solid #000 !important;
   min-height:50px !important;
    width:250px !important;
    position:fixed;
    top:100px;
    left:100px;
}
</style>
