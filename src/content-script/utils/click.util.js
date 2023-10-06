export default function clickElement(selector) {
  return new Promise((resolve, reject) => {
    let element = selector;

    if (typeof selector != "object") {
      element = document.querySelector(selector);
    }

    function triggerMouseEvent(node, eventType) {
      var clickEvent = document.createEvent("MouseEvents");
      clickEvent.initEvent(eventType, true, true);
      node.dispatchEvent(clickEvent);
    }

    if (element) {
      triggerMouseEvent(element, "mouseover");
      triggerMouseEvent(element, "mousedown");
      triggerMouseEvent(element, "mouseup");
      triggerMouseEvent(element, "click");
      resolve();
    } else {
      reject();
    }
  });
}
