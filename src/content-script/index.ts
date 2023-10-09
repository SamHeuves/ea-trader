import './index.scss'
import searchLoop from './iframe/actions/searchLoop.action'
import insertionQ from 'insertion-query'
import click from './iframe/actions/click.action'

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

const style = document.createElement('style')
style.innerHTML = `#NotificationLayer {z-index: 99999999999999;} .app-active {
  padding-right: 400px;
}`

document.getElementsByTagName('head')[0].appendChild(style)

// Add class for UT, to fit next to extension
insertionQ('.ut-root-view').every(function(element: HTMLElement){
	element.classList.add('app-active')
});

// When page is loaded
insertionQ('.ut-navigation-container-view--content > div').every(function(element: HTMLElement){
  if (element.classList.contains('ut-market-search-filters-view')) {
    transferSearch = true;
  } else {
    transferSearch = false;
  }
  
  loading = false
  
  if (iFrame.contentWindow) {
    iFrame.contentWindow.postMessage({action: 'pageChange', transferSearch, loading}, "*");
  }
});

window.addEventListener('message', async (event) => {
  const { data } = event
  searching = data.searching

  function startSearch(val: boolean) {
    if (!val) {
      return false
    }

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
    click('button.icon-transfer');
    click('.ut-tile-transfer-market');
  }

  // Start or stop searching
  if (data.action == 'startSearch') {
    startSearch(searching)
  }
})
