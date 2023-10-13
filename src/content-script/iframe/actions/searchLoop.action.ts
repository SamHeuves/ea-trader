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
    if (searching && count < setCount) {
      count += 1
      sessionCount += 1

      click('.ut-market-search-filters-view .btn-standard.call-to-action').then(
        () => {
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

          setTimeout(() => {
            if (document.querySelector('.SearchResults')) {
              let length = 0
              setTimeout(() => {
                if (document.querySelector('.listFUTItem')) {
                  length = document.querySelectorAll(
                    '.paginated-item-list > ul > li'
                  ).length
                }
                resolve({ length, count })
              }, 1000)
            }
            insertionQ('.SearchResults').every(function () {
              let length = 0
              setTimeout(() => {
                if (document.querySelector('.listFUTItem')) {
                  length = document.querySelectorAll(
                    '.paginated-item-list > ul > li'
                  ).length
                }
                resolve({ length, count })
              }, 1000)
            })
          }, 1000)
        }
      )
    } else {
      reject({ length, count })
    }
  })
}
