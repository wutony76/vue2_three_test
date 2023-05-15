import Vue from 'vue'
import Clipboard from 'clipboard'

function clipboardSuccess (text) {
  const t = text || ''
  Vue.prototype.$message({
    message: `${t}复制成功`,
    type: 'success',
    duration: 1500
  })
}

function clipboardError (text) {
  const t = text || ''
  Vue.prototype.$message({
    message: `${t}复制失败`,
    type: 'error'
  })
}

export default function handleClipboard (text, event, type) {
  const clipboard = new Clipboard(event.target, {
    text: () => text
  })
  clipboard.on('success', () => {
    clipboardSuccess(type)
    clipboard.off('error')
    clipboard.off('success')
    clipboard.destroy()
  })
  clipboard.on('error', () => {
    clipboardError(type)
    clipboard.off('error')
    clipboard.off('success')
    clipboard.destroy()
  })
  clipboard.onClick(event)
}
