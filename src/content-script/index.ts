// Import dependencies
import './index.scss'
import searchLoop from './iframe/actions/searchLoop.action'
import insertionQ from 'insertion-query'
import click from './iframe/actions/click.action'
import playerSelection from './iframe/actions/selectPlayer.action'
import buyNowInput from './iframe/actions/buyNow.action'
import searchResults from './iframe/actions/searchResults.action'

// Init variables
const iFrame = document.createElement('iframe')
let transferSearch: boolean
let resultPage: boolean
let searching: boolean
let loading: boolean
let count: number = 0
let sessionCount: number = 0
const setCount: number = 20
const pauseTime: number = 120
const changeEvent = new UIEvent('change', {
  view: window,
  bubbles: true,
  cancelable: true,
})

/**
 * The code below will get everything going. Initialize the iFrame with defaults and add it to the page.
 * @type {string}
 */
iFrame.height = '100vh'
iFrame.id = 'bex-app-iframe'
iFrame.width = '400px'

// Assign some styling so it looks seamless
Object.assign(iFrame.style, {
  position: 'fixed',
  height: '100vh',
  right: '0',
  top: '0',
  border: '0',
  zIndex: '9999999', // Make sure it's on top
  overflow: 'visible',
})
;(function () {
  // When the page loads, insert our browser extension app.
  iFrame.src = chrome.runtime.getURL('src/content-script/iframe/index.html')
  document.body.prepend(iFrame)
})()

// Create inline css style
const style = document.createElement('style')
style.innerHTML = `#NotificationLayer {z-index: 99999999999999;} .app-active {
  padding-right: 400px;
  .fade-in, .fade-out {
    -webkit-animation-duration: .25s !important;
    animation-duration: .25s !important;
    -webkit-animation-iteration-count: 1 !important;
    animation-iteration-count: 1 !important;
    -webkit-animation-fill-mode: forwards !important;
    animation-fill-mode: forwards !important;
    -webkit-animation-name: fade-keyframes !important;
    animation-name: fade-keyframes !important;
}
}`

// Append style to header
document.getElementsByTagName('head')[0].appendChild(style)

// Add class for UT, to fit next to extension
insertionQ('.ut-root-view').every(function (element: HTMLElement) {
  element.classList.add('app-active')
})

// When page is loaded
insertionQ('.ut-navigation-container-view--content > div').every(function (
  element: HTMLElement
) {
  transferSearch = false
  resultPage = false
  loading = false

  // Check if we are on the transfer search page
  if (element.classList.contains('ut-market-search-filters-view')) {
    playerSelection(iFrame)
    buyNowInput(iFrame)
    transferSearch = true
  } else if (
    element.classList.contains('ut-split-view') ||
    element.classList.contains('DetailView')
  ) {
    transferSearch = true
    resultPage = true
  }

  // Post to iFrame that page is loaded
  if (iFrame.contentWindow) {
    iFrame.contentWindow.postMessage(
      { action: 'pageChange', transferSearch, resultPage, loading },
      '*'
    )
  }
})

function setFilter(maxBuy: string) {
  click(
    document
      .querySelectorAll('.price-filter')[2]
      .getElementsByTagName('button')[1]
  )

  if (
    document
      .querySelectorAll('.price-filter')[2]
      .getElementsByTagName('input')[0].value == maxBuy
  ) {
    document
      .querySelectorAll('.price-filter')[2]
      .getElementsByTagName('input')[0].value = 0
    document
      .querySelectorAll('.price-filter')[2]
      .getElementsByTagName('input')[0]
      .dispatchEvent(changeEvent)
  } else {
    click(
      document
        .querySelectorAll('.price-filter')[2]
        .getElementsByTagName('button')[1]
    )
  }

  document
    .querySelectorAll('.price-filter')[3]
    .getElementsByTagName('input')[0].value = maxBuy

  document
    .querySelectorAll('.price-filter')[3]
    .getElementsByTagName('input')[0]
    .dispatchEvent(changeEvent)
}

function startSearch(val: boolean, maxBuy: string, sellPrice: string) {
  // Stop searching if button is clicked again
  if (!val) {
    return false
  }

  setFilter(maxBuy)

  // Loop for searching the transferlist
  searchLoop(val, iFrame, count, setCount, sessionCount).then(
    (result: object) => {
      if (!searching) {
        return false
      }
      sessionCount += 1
      count += 1

      searchResults(result.length, searching)
        .then(() => {
          click('.buyButton').then(() => {
            insertionQ('.ea-dialog-view--body').every(function () {
              click('.ea-dialog-view--body .ut-button-group button').then(
                () => {
                  insertionQ('.negative').every(function () {
                    // Failed buynow
                    click('.ut-navigation-button-control').then(() => {
                      if (iFrame.contentWindow) {
                        iFrame.contentWindow.postMessage(
                          {
                            action: 'searchAction',
                            purchase: false,
                            count,
                            sessionCount,
                          },
                          '*'
                        )
                      }

                      startSearch(searching, maxBuy, sellPrice)
                    })
                  })
                  insertionQ('.accordian').every(function (
                    element: HTMLElement
                  ) {
                    click('.accordian').then(() => {
                      const buyNowEl = document
                        .querySelectorAll('.panelActionRow')[2]
                        .querySelector('input')!
                      const bidEl = document
                        .querySelectorAll('.panelActionRow')[1]
                        .querySelector('input')!
                      bidEl.value = sellPrice
                      buyNowEl.value = sellPrice
                      buyNowEl.dispatchEvent(changeEvent)
                      click(
                        document
                          .querySelector('.panelActions')!
                          .querySelectorAll('button')[4]
                      ).then(() => {
                        if (iFrame.contentWindow) {
                          iFrame.contentWindow.postMessage(
                            {
                              action: 'searchAction',
                              purchase: true,
                              count,
                              sessionCount,
                            },
                            '*'
                          )
                        }
                        click('.ut-navigation-button-control')
                        setTimeout(() => {
                          startSearch(searching, maxBuy, sellPrice)
                        }, 3000)
                      })
                    })
                  })
                }
              )
            })
          })
        })
        .catch((error) => {
          searching = error
          startSearch(searching, maxBuy, sellPrice)
        })
        .finally(() => {
          if (count == setCount) {
            count = 0
            if (iFrame.contentWindow) {
              iFrame.contentWindow.postMessage(
                {
                  action: 'startBreak',
                  count,
                  setCount,
                  pauseTime,
                  searching,
                  sessionCount,
                },
                '*'
              )
            }
          }
        })
    }
  )
}

// Event for listening to messages from iFrame
window.addEventListener('message', async (event) => {
  const { data } = event
  searching = data.searching

  // Go to transferlist page
  if (data.action == 'goToTransferList') {
    click('button.icon-transfer')
    click('.ut-tile-transfer-market')
  }

  // Start or stop searching
  if (data.action == 'startSearch') {
    searching = data.searching
    const maxBuy = data.buyPrice
    const sellPrice = data.sellPrice

    startSearch(searching, maxBuy, sellPrice)
  }

  // When a card version is selected
  // set the dropdown values
  if (data.action == 'cardSelected') {
    if (data.rarityDropdown != -1) {
      if (data.qualityDropdown != -1) {
        const qualityDropdown = document
          .querySelector('.ut-item-search-view')!
          .querySelectorAll(
            '.inline-list-select .ut-search-filter-control--row'
          )[0]

        click(qualityDropdown).then(() => {
          const options = document
            .querySelector('.ut-item-search-view')!
            .querySelectorAll('.inline-list > li')
          click(options[data.qualityDropdown])
        })
      }

      const rarityDropdown = document
        .querySelector('.ut-item-search-view')!
        .querySelectorAll(
          '.inline-list-select .ut-search-filter-control--row'
        )[1]

      setTimeout(() => {
        click(rarityDropdown).then(() => {
          const options = document
            .querySelector('.ut-item-search-view')!
            .querySelectorAll('.inline-list > li')
          click(options[data.rarityDropdown])
        })
      }, 100)
    } else {
      click(document.querySelectorAll('.ut-search-filter-control button')[1])
    }
  }

  // When the buy now value is changed
  if (data.action == 'buyNowChanged') {
    // Init change event
    const event = new UIEvent('change', {
      view: window,
      bubbles: true,
      cancelable: true,
    })

    const buyNowFilter = document
      .querySelectorAll('.price-filter')[3]
      .getElementsByTagName('input')[0]

    buyNowFilter.value = data.newVal

    buyNowFilter.dispatchEvent(event)
  }
})
