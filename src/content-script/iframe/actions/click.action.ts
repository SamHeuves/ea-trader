export default function click(selector: string | Element) {
  return new Promise((resolve, reject) => {
    let element = selector

    if (typeof selector != 'object') {
      element = document.querySelector(selector)!
    }

    function triggerMouseEvent(node: Element, eventType: string) {
      const clickEvent = document.createEvent('MouseEvents')
      clickEvent.initEvent(eventType, true, true)
      node.dispatchEvent(clickEvent)
    }

    if (typeof element == 'object') {
      triggerMouseEvent(element, 'mouseover')
      triggerMouseEvent(element, 'mousedown')
      triggerMouseEvent(element, 'mouseup')
      triggerMouseEvent(element, 'click')
      resolve({ success: element })
    } else {
      reject({ fail: element })
    }
  })
}
