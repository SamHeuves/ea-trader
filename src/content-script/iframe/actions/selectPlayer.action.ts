export default function playerSelection(iFrame: HTMLIFrameElement) {
  let rating
  let name

  function callback(mutations: MutationRecord[]) {
    for (const mutation of mutations) {
      if (mutation.addedNodes.length > 0) {
        mutation.addedNodes[0].addEventListener(
          'click',
          function (event: Event) {
            const target = event.target as HTMLInputElement

            if (target.tagName == 'BUTTON') {
              rating = target.children[1].innerHTML
              name = target.children[0].innerHTML
            } else {
              rating = target.parentElement!.children[1].innerHTML
              name = target.parentElement!.children[0].innerHTML
            }

            if (iFrame.contentWindow) {
              iFrame.contentWindow.postMessage(
                { action: 'playerSelected', name, rating },
                '*'
              )
            }
          }
        )
      }
    }
  }

  const observer = new MutationObserver(callback)

  const target = document.querySelector('.ut-player-search-control')

  observer.observe(target as Node, {
    subtree: true,
    childList: true,
  })
}
