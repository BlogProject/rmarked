var base64 = require('./base64.js')

function clipboardCopy (text) {
  // A <span> contains the text to copy
  var span = document.createElement('span')
  span.textContent = text
  span.style.whiteSpace = 'pre' // Preserve consecutive spaces and newlines

  // An <iframe> isolates the <span> from the page's styles
  var iframe = document.createElement('iframe')
  iframe.sandbox = 'allow-same-origin'
  document.body.appendChild(iframe)

  var win = iframe.contentWindow
  win.document.body.appendChild(span)

  var selection = win.getSelection()

  // Firefox fails to get a selection from <iframe> window, so fallback
  if (!selection) {
    win = window
    selection = win.getSelection()
    document.body.appendChild(span)
  }

  var range = win.document.createRange()
  selection.removeAllRanges()
  range.selectNode(span)
  selection.addRange(range)

  var success = false
  try {
    success = win.document.execCommand('copy')
  } catch (err) {}

  selection.removeAllRanges()
  span.remove()
  iframe.remove()

  return success
}


module.exports = function(e){
  var cp_code=e.getAttribute("data-copy");
  var decode = base64.decode(cp_code)
  var isSuc = clipboardCopy(decode)
  if(decode){
    var p = e.firstElementChild
    console.log(p.innerHTML)
    p.innerHTML = "Copied!"
    setTimeout(function(){ 
      p.innerHTML = "Copy to clipbord!"
    },1500)
  }
  else{
  }
}
