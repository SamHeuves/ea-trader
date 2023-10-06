export default function waitForAddedNode(params) {
  new MutationObserver(function (mutations) {
    console.log(mutations);
    var el = document.querySelector(params.class);
    if (el) {
      this.disconnect();
      params.done(el);
    }
  }).observe(params.parent || document, {
    subtree: !!false || !params.parent,
    childList: true,
  });
}
