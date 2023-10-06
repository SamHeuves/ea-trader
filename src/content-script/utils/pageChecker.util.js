// import playerSelection from "./playerSelection.util";

export default function pageName(bridge) {
  function callback(mutationConfigList) {
    let activeView;

    for (const mutationConfig of mutationConfigList) {
      if (
        mutationConfig.target ==
          document.querySelector("div.ut-navigation-container-view--content") &&
        mutationConfig.addedNodes.length > 0
      ) {
        switch (mutationConfig.target.children[0].classList[0]) {
          case "ut-squads-hub-view":
            activeView = "squads";
            break;
          case "SBCHub":
            activeView = "sbc";
            break;
          case "TransfersHub":
            activeView = "transfers";
            break;
          case "ut-customize-hub-view":
            activeView = "stadium";
            break;
          case "ut-store-hub-tile-view":
            activeView = "store";
            break;
          case "ut-club-hub-view":
            activeView = "club";
            break;
          case "ut-leaderboards-hub":
            activeView = "leaderboard";
            break;
          case "ut-app-settings":
            activeView = "settings";
            break;
          case "ut-market-search-filters-view":
            activeView = "transfers-search";
            break;
          default:
            activeView = "home";
        }

        bridge.send("page.change", { activeView });

        if (activeView == "transfers-search") {
          // playerSelection(bridge);
          const buyNowInput = document
            .querySelectorAll(".price-filter")[3]
            .getElementsByTagName("input")[0];

          buyNowInput.addEventListener("blur", (event) => {
            bridge.send("page.transferHub.buyNowChanged", {
              value: buyNowInput.value.replaceAll(",", "").replaceAll(".", ""),
            });
          });

          let buttons = document
            .querySelectorAll(".price-filter")[3]
            .querySelectorAll("button");

          buttons.forEach((button) => {
            button.addEventListener("click", (event) => {
              bridge.send("page.transferHub.buyNowChanged", {
                value: buyNowInput.value
                  .replaceAll(",", "")
                  .replaceAll(".", ""),
              });
            });
          });
        }
      }
    }
  }

  const observer = new MutationObserver(callback);

  let target = document.querySelector(".app-active");

  observer.observe(target, {
    subtree: true,
    childList: true,
  });
}
