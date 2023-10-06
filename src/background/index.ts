import { onMessage } from 'webext-bridge/background'

onMessage('message', async ({ data }) => {
    console.log(data)
})


chrome.runtime.onInstalled.addListener(async (opt) => {
  if (opt.reason === 'install') {
    await chrome.storage.local.clear()

    chrome.tabs.create({
      active: true,
      url: chrome.runtime.getURL('./installed.html'),
    })
  }
})

console.log('hello world from background')

export {}
