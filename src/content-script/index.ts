// Import dependencies
import './index.scss'
import searchLoop from './iframe/actions/searchLoop.action'
import insertionQ from 'insertion-query'
import click from './iframe/actions/click.action'
import playerSelection from './iframe/actions/selectPlayer.action'
import buyNowInput from './iframe/actions/buyNow.action'

// Init variables
const iFrame = document.createElement('iframe')
let transferSearch: boolean
let searching: boolean
let loading: boolean

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
  // Check if we are on the transfer search page
  if (element.classList.contains('ut-market-search-filters-view')) {
    playerSelection(iFrame)
    buyNowInput(iFrame)

    transferSearch = true
  } else {
    transferSearch = false
  }

  // Stop loader
  loading = false

  // Post to iFrame that page is loaded
  if (iFrame.contentWindow) {
    iFrame.contentWindow.postMessage(
      { action: 'pageChange', transferSearch, loading },
      '*'
    )
  }
})

// Event for listening to messages from iFrame
window.addEventListener('message', async (event) => {
  const { data } = event
  searching = data.searching

  function startSearch(val: boolean) {
    // Stop searching if button is clicked again
    if (!val) {
      return false
    }

    // Loop for searching the transferlist
    searchLoop(val)
      .then(() => {
        setTimeout(() => {
          startSearch(searching)
        }, 1000)
      })
      .catch(() => {
        searching = false
      })
  }

  // Go to transferlist page
  if (data.action == 'goToTransferList') {
    click('button.icon-transfer')
    click('.ut-tile-transfer-market')
  }

  // Start or stop searching
  if (data.action == 'startSearch') {
    startSearch(searching)
  }
})
