import Vue from 'vue'

var self = null
var msgNotice = null
var msgTimer = null

Vue.prototype.$msg = function (message = 'nothing', type = 1, cb) {
  function clearMsgTimer () {
    // console.log('ttt clearMsgTimer.msgTimer >', msgTimer)
    if (msgTimer) {
      clearTimeout(msgTimer)
      msgTimer = null
    }
  }

  function resetMsgTimer() {
    // console.log('ccc resetMsgTimer.msgNotice >', msgNotice)
    // console.log('ccc msgNotice >', msgNotice)
    // console.log('ccc msgTimer >', msgTimer)

    msgTimer = setTimeout(() => {
      msgNotice.close()
      msgNotice = null
      msgTimer = null
      if (cb ) cb() 
    }, 2.3 * 1000)
  }

  // handle.msgNotice
  if (msgNotice) {
    clearMsgTimer() 
    // console.log('ccc msgNotice true >', msgNotice)
    msgNotice.message = message
  } else {
    // console.log('ccc msgNotice false1 >', msgNotice)
    const msgType = type === 1 ? 'error' : 'success'
    msgNotice = Vue.prototype.$message({
      showClose: false,
      message: message,
      type: msgType,
      duration: 0,
    })
    // console.log('ccc msgNotice false2 >', msgNotice)
  }

  // clear.close.msgNotice
  resetMsgTimer()
}  

export default {
  self,
}
