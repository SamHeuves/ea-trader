<!-- eslint-disable vue/v-on-event-hyphenation -->
<template>
  <div
    v-show="pageload"
    class="ut-click-shield"
  >
    <img
      src="https://www.ea.com/nl-nl/ea-sports-fc/ultimate-team/web-app/images/loader.gif"
    />
  </div>
  <v-expand-transition>
    <div v-show="transferSearch && !pageload">
      <div class="flex items-center gap-4 p-4">
        <div class="flex w-100">
          <v-card
            class="mx-auto"
            width="400"
          >
            <template #title>
              <span class="text-success">
                <v-icon icon="mdi-shield-account-outline"></v-icon>
              </span>
              Select card type
            </template>
            <v-expand-transition>
              <v-card-text
                v-show="selectElement"
                class="flex flex-wrap"
                style="flex-direction: column"
              >
                <v-item-group
                  v-model="selectElement"
                  mandatory
                  @update:modelValue="selectPlayer"
                >
                  <v-container>
                    <v-row style="min-height: 110px">
                      <v-col
                        v-for="n in resultArray"
                        :key="n.pid"
                        :value="n"
                        cols="3"
                      >
                        <v-item
                          v-slot="{ isSelected, toggle }"
                          :value="n"
                        >
                          <v-card
                            flat
                            style="background: none"
                            :class="isSelected ? '' : 'blackWhite'"
                            class="d-flex align-center justify-center"
                            @click="toggle"
                          >
                            <v-img
                              :width="50"
                              cover
                              :src="
                                'https://cdn.futwiz.com/assets/img/fc24/items/' +
                                n.cardClass
                              "
                            ></v-img>
                            <v-img
                              style="width: 40px; position: absolute"
                              cover
                              :src="
                                'https://cdn.futwiz.com/assets/img/fc24/faces/' +
                                n.pid +
                                '.png'
                              "
                            ></v-img>
                          </v-card>
                        </v-item>
                      </v-col>
                    </v-row>
                  </v-container>
                </v-item-group>
                <v-alert
                  variant="tonal"
                  border="top"
                  border-color="success"
                  elevation="2"
                >
                  <span class="w-100 flex">
                    <strong
                      style="width: 100% !important; display: inline-block"
                    >
                      {{ selectedPlayer.name }} ({{ selectedPlayer.rating }})
                    </strong>
                  </span>
                  <span class="w-100 flex">
                    <div class="flex w-100 items-center">
                      <v-img
                        :height="15"
                        :max-width="20"
                        src="https://www.ea.com/nl-nl/ea-sports-fc/ultimate-team/web-app/images/coinIcon.png"
                      ></v-img>
                      <span class="pl-1">
                        {{ selectedPlayer.parsedPrice }}
                        , {{ selectedPlayer.update }}
                      </span>
                    </div>
                  </span>
                </v-alert>
              </v-card-text>
              <v-card-text v-show="!element">
                Please select a player from the webapp
              </v-card-text>
            </v-expand-transition>
          </v-card>
        </div>
      </div>
      <div class="flex items-center gap-4 p-4">
        <div class="flex w-100">
          <v-card
            class="mx-auto"
            width="400"
          >
            <template #title>
              <span class="text-success">
                <v-icon icon="mdi-shield-check-outline"></v-icon>
              </span>
              What to do with purchases
            </template>
            <v-tabs
              v-model="tab"
              bg-color="surface"
              class="mb-sm"
              grow
            >
              <v-tab value="one">Quicklist</v-tab>
              <v-tab value="two">Item Two</v-tab>
              <v-tab value="three">Item Three</v-tab>
            </v-tabs>

            <v-card-text>
              <v-window
                v-model="tab"
                class="py-3"
              >
                <v-window-item value="one">
                  <v-row>
                    <v-col cols="5">
                      Buy price
                      <CurrencyInput
                        v-model="buyPrice"
                        :options="{
                          currency: 'EUR',
                          currencyDisplay: 'hidden',
                        }"
                      />
                    </v-col>
                    <v-col cols="7">
                      Sell price
                      <v-text-field
                        v-model="sellPrice"
                        hide-details="auto"
                        type="number"
                        bg-color="surface"
                        color="success"
                        density="compact"
                      >
                        <template #prepend>
                          <v-btn
                            flat
                            density="comfortable"
                            icon="mdi-minus"
                          ></v-btn>
                        </template>
                        <template #append>
                          <v-btn
                            flat
                            density="comfortable"
                            icon="mdi-plus"
                          ></v-btn>
                        </template>
                      </v-text-field>
                    </v-col>
                  </v-row>
                  <v-expand-transition>
                    <v-alert
                      v-show="!isNaN(profit)"
                      variant="tonal"
                      border="top"
                      :border-color="percentage > 0 ? 'success' : 'error'"
                      elevation="2"
                    >
                      <span class="w-100 flex">
                        <div class="flex w-100 items-center">
                          <v-img
                            :height="15"
                            :max-width="20"
                            src="https://www.ea.com/nl-nl/ea-sports-fc/ultimate-team/web-app/images/coinIcon.png"
                          ></v-img>
                          <span class="pl-1">
                            {{ profit.toLocaleString() }}
                          </span>
                        </div>
                        <div>{{ percentage }}%</div>
                      </span>
                    </v-alert>
                  </v-expand-transition>
                </v-window-item>

                <v-window-item value="two">Two</v-window-item>

                <v-window-item value="three">Three</v-window-item>
              </v-window>
            </v-card-text>
          </v-card>
        </div>
      </div>
    </div>
  </v-expand-transition>
  <div class="ma-5">
    <v-progress-linear
      :model-value="progressValue"
      color="success"
      height="25"
      striped
    >
      <template #default="{ value }">
        <strong v-if="!searchBreak">{{ searchCount }} / {{ setCount }}</strong>
        <strong v-else>{{ breakTime }}</strong>
      </template>
    </v-progress-linear>
    <v-expand-transition>
      <v-btn
        v-show="transferSearch && !pageload"
        id="search"
        :disabled="percentage < 0"
        :color="!searching ? 'primary' : 'success'"
        block
        rounded
      >
        {{ setButtonText }}
      </v-btn>
    </v-expand-transition>
    <v-expand-transition>
      <v-btn
        v-show="!transferSearch && !pageload"
        id="goToTransferList"
        color="primary"
        block
        rounded
      >
        Go to transferlist
      </v-btn>
    </v-expand-transition>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref, computed } from 'vue'
import axios from 'axios'
import cardType from '../actions/cardType.action'
import CurrencyInput from '../../../components/currenyInput.vue'

class Player {
  public price: number
  public parsedPrice: string
  public update: string
  public pid: string
  public name: string
  public rating: string
  public cardClass: string
  public qualityDropdown: number
  public rarityDropdown: number
}

let searching = ref(false)
let searchBreak = ref(false)
let transferSearch = ref(false)
let pageload = ref(true)
let selectedPlayer = ref({})
let resultArray: Ref<Player[]> = ref([])
let selectElement = ref()
let sellPrice = ref()
let buyPrice = ref()
let searchCount = ref(0)
let setCount = ref(20)
let breakTime = ref(0)
let initialBreakTime = ref(0)
let progressValue = ref(0)

const profit = computed(() => {
  return sellPrice.value * 0.95 - buyPrice.value
})

const percentage = computed(() => {
  return ((profit.value / buyPrice.value) * 100).toFixed(2)
})

const setButtonText = computed(() => {
  return searching.value ? 'Stop searching' : 'Start searching'
})

function selectPlayer(x: Player) {
  selectedPlayer.value = x
  sellPrice.value = x.price
  buyPrice.value = x.price
  parent.postMessage(
    {
      action: 'cardSelected',
      qualityDropdown: x.qualityDropdown,
      rarityDropdown: x.rarityDropdown,
    },
    '*'
  )
}

function countDownTimer() {
  if (breakTime.value > 0) {
    setTimeout(() => {
      breakTime.value -= 1
      progressValue.value = (100 / initialBreakTime.value) * breakTime.value
      countDownTimer()
    }, 1000)
  } else {
    parent.postMessage(
      {
        action: 'startSearch',
        searching: searching.value,
        buyPrice: buyPrice.value,
        sellPrice: sellPrice.value,
      },
      '*'
    )
  }
}

watch(buyPrice, async (newVal, oldVal) => {
  if (newVal != oldVal) {
    parent.postMessage({ action: 'buyNowChanged', newVal }, '*')
  }
})

onMounted(() => {
  const searchButton = document.getElementById('search')!

  searchButton.addEventListener('click', async () => {
    searching.value = !searching.value
    parent.postMessage(
      {
        action: 'startSearch',
        searching: searching.value,
        buyPrice: buyPrice.value,
        sellPrice: sellPrice.value,
      },
      '*'
    )
  })

  const goToTransferList = document.getElementById('goToTransferList')!

  goToTransferList.addEventListener('click', async () => {
    parent.postMessage({ action: 'goToTransferList', searching: false }, '*')
  })

  // Event listener for messages from content-script
  window.addEventListener('message', async (event) => {
    const { data } = event

    if (data.action == 'pageChange') {
      transferSearch.value = data.transferSearch
      pageload.value = data.loading
    } else if (data.action == 'playerSelected') {
      resultArray.value = []

      axios
        .get(`https://www.futwiz.com/en/searches/player24/${data.name}`)
        .then((response) => {
          response.data.forEach((element: object) => {
            axios
              .get(
                `https://www.futwiz.com/en/app/sold24/${element.lineid}/console`
              )
              .then((price) => {
                const player: Player = {
                  price: parseFloat(price.data.lowestbin.bin.replace(/,/g, '')),
                  parsedPrice: parseFloat(
                    price.data.lowestbin.bin.replace(/,/g, '')
                  ).toLocaleString(),
                  update: price.data.lowestbin.ud,
                  pid: price.data.player.altimage
                    ? price.data.player.altimage
                    : price.data.player.pid,
                  name: price.data.player.common_name,
                  rating: price.data.player.rating,
                  cardClass: cardType(price.data.player.appclass).imageSrc,
                  qualityDropdown: cardType(price.data.player.appclass)
                    .qualityDropdown,
                  rarityDropdown: cardType(price.data.player.appclass)
                    .rarityDropdown,
                }

                if (player.update != 'Never') {
                  resultArray.value.push(player)
                }
              })
              .finally(() => {
                selectElement.value = resultArray.value[0]
                selectedPlayer.value = resultArray.value[0]
                selectPlayer(resultArray.value[0])
              })
          })
        })
    } else if (data.action == 'buyNowChanged') {
      buyPrice.value = data.value
    } else if (data.action == 'searchCount') {
      searchCount.value = data.count
      searching.value = data.searching
      searchBreak.value = false
      setCount.value = data.setCount
      progressValue.value = (100 / setCount.value) * searchCount.value
    } else if (data.action == 'startBreak') {
      searchCount.value = data.count
      searching.value = data.searching
      searchBreak.value = true
      setCount.value = data.setCount
      breakTime.value = data.pauseTime
      initialBreakTime.value = data.pauseTime
      countDownTimer()
    }
  })
})

let tab = ref('one')
</script>

<style lang="scss" scoped>
.card-title {
  border-top-right-radius: var(--rounded-box, 1rem);
  border-top-left-radius: var(--rounded-box, 1rem);
}

.v-card-text {
  padding-top: 16px;
}

.blackWhite {
  filter: grayscale(100%);
}

.ut-click-shield {
  background-color: #000c;
  height: 100%;
  justify-content: center;
  align-items: center;
  width: 100%;
  display: flex;
  position: absolute;
  z-index: 10000000000000000;

  img {
    height: 100px;
  }
}
</style>
