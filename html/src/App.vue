<template>
  <div id="app">
    <textarea :value="input" @input="update"></textarea>
    <div class="markdown-body" v-html="compiledMarked"> </div>
  </div>
</template>

<script>
var rmarked = require("../../index.js")()
export default {
  name: 'app',
  data () {
    return {
      input:"# hello",
      last:null,
    }
  },
  mounted(){
    let content = document.getElementById("content")
    if(content.innerText !== null)
      this.input = content.innerText
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
      return rmarked(self.input)
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
</style>
