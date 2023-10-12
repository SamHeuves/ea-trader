import click from '../actions/click.action'
import insertionQ from 'insertion-query'

export default function (searching: boolean) {
  return new Promise<number>(function (resolve, reject) {
    if (searching) {
      click('.ut-market-search-filters-view .btn-standard.call-to-action').then(
        () => {
          insertionQ('.SearchResults').every(function (element: HTMLElement) {
            let length = 0
            setTimeout(() => {
              if (document.querySelector('.listFUTItem')) {
                length = document.querySelectorAll(
                  '.paginated-item-list > ul > li'
                ).length
              }

              resolve(length)
            }, 1000)
          })
        }
      )
    } else {
      reject()
    }
  })
}
