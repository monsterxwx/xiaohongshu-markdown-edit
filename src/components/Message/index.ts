import { createVNode, render } from 'vue'
import MessageComponent from './message.vue'

export const Message = (options) => {
  if (typeof options === 'string') {
    options = { text: options, type: 'info' }
  }

  const container = document.createElement('div')
  document.body.appendChild(container)

  const vnode = createVNode(MessageComponent, {
    ...options,
    onClose: () => {
      render(null, container)
      if (document.body.contains(container)) {
        document.body.removeChild(container)
      }
      if (typeof options.onClose === 'function') {
        options.onClose()
      }
    }
  })

  render(vnode, container)
}

Message.success = (text) => Message({ text, type: 'success' })
Message.warning = (text) => Message({ text, type: 'warning' })
Message.error = (text) => Message({ text, type: 'error' })
Message.info = (text) => Message({ text, type: 'info' })
