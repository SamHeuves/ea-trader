
import insertionQ from 'insertion-query'

export default function click(selector: string | Element) {
  return new Promise((resolve) => {
    const eventList = ['mouseover', 'mousedown', 'mouseup', 'click']
    let element = selector

    if (typeof selector != 'object') {
      element = document.querySelector(selector)!
    }

    function triggerMouseEvent(node: Element, eventType: string) {
      const clickEvent = document.createEvent('MouseEvents')
      clickEvent.initEvent(eventType, true, true)
      node.dispatchEvent(clickEvent)
    }

    function clickFunction(element: Element) {
      eventList.forEach((x) => {
        triggerMouseEvent(element, x)
      })
    }

    if (element && typeof element == 'object') {
      clickFunction(element);
      resolve({ success: element })
    } else {
      insertionQ(selector).every(function (element: HTMLElement) {
        clickFunction(element);
        resolve({ success: element })
      })  
    }
  })
}
