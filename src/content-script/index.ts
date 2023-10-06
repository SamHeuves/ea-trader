import './index.scss'
import searchLoop from './iframe/actions/searchLoop.action'

const iFrame = document.createElement('iframe')

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

let searching: boolean

// content-script/index.ts
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

  if (data.action == 'goToTransfer') {
    startSearch(searching)
  }

  if (data.action == 'startSearch') {
    startSearch(searching)
  }
})
