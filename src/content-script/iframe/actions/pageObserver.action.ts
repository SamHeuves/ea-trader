export default function pageName() {
  function callback(mutationConfigList: MutationRecord[]) {
    let activeView

    for (const mutationConfig of mutationConfigList) {
      if (
        mutationConfig.target ==
          document.querySelector('div.ut-navigation-container-view--content') &&
        mutationConfig.addedNodes.length > 0
      ) {
        switch (mutationConfig.target.children[0].classList[0]) {
          case 'ut-squads-hub-view':
            activeView = 'squads'
            break
          case 'SBCHub':
            activeView = 'sbc'
            break
          case 'TransfersHub':
            activeView = 'transfers'
            break
          case 'ut-customize-hub-view':
            activeView = 'stadium'
            break
          case 'ut-store-hub-tile-view':
            activeView = 'store'
            break
          case 'ut-club-hub-view':
            activeView = 'club'
            break
          case 'ut-leaderboards-hub':
            activeView = 'leaderboard'
            break
          case 'ut-app-settings':
            activeView = 'settings'
            break
          case 'ut-market-search-filters-view':
            activeView = 'transfers-search'
            break
          default:
            activeView = 'home'
        }
      }
    }

    console.log(activeView)
  }

  const observer = new MutationObserver(callback)

  const target = document.querySelector('.app-active')!

  observer.observe(target, {
    subtree: true,
    childList: true,
  })
}
