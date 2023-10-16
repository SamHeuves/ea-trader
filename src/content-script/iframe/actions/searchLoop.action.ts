import click from '../actions/click.action'
import insertionQ from 'insertion-query'

export default function (
  searching: boolean,
  iFrame: HTMLIFrameElement,
  count: number,
  setCount: number,
  sessionCount: number
) {
  return new Promise<object>(function (resolve, reject) {
    let length: number = 0

    if (searching && count < setCount) {
      count += 1
      sessionCount += 1

      click('.ut-market-search-filters-view .btn-standard.call-to-action')
        .then(() => {
          if (iFrame.contentWindow) {
            iFrame.contentWindow.postMessage(
              {
                action: 'searchCount',
                count,
                setCount,
                searching,
                sessionCount,
              },
              '*'
            )
          }

          insertionQ('.ut-pinned-list > ul').every(function (
            element: HTMLElement
          ) {
            insertionQ('.listFUTItem').every(function () {
              length = element.querySelectorAll('li.listFUTItem').length
            })
          })
        })
        .finally(() => {
          resolve({ length, count })
        })
    } else {
      reject({ length, count })
    }
  })
}
