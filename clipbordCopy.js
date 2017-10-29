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


module.exports = function(str){
  let decode = atob(str)
  let res = clipboardCopy(decode)
  if(res) alert("复制代码成功!!")
  else
    alert("复制代码失败!!")
}

exports.init = function(){
}
