<template>
  <!-- <div class="ut-click-shield showing">
    <img
      src="https://www.ea.com/nl-nl/ea-sports-fc/ultimate-team/web-app/images/loader.gif"
      class="loaderIcon"
      style=""
    />
  </div> -->
  <div class="flex items-center gap-4 p-4">
    <img
      class="w-12 h-12 rounded-full"
      src="https://cdn.futwiz.com/assets/img/fc24/faces/253072.png"
    />
    <div class="flex flex-col">
      <strong>Darwin Nuñez (82)</strong>
      <span>8,300, 2 minutes ago</span>
    </div>
  </div>

  <v-card>
    <v-tabs
      v-model="tab"
      bg-color="primary"
      class="mb-sm"
      grow
    >
      <v-tab value="one">Item One</v-tab>
      <v-tab value="two">Item Two</v-tab>
      <v-tab value="three">Item Three</v-tab>
    </v-tabs>

    <v-card-text>
      <v-window v-model="tab">
        <v-window-item value="one">
          <v-row>
            <v-col cols="7">
              <v-text-field
                hide-details="auto"
                type="number"
                bg-color="primary"
                color="success"
                density="compact"
                label="Selling price"
              >
                <template v-slot:prepend>
                  <v-btn
                    flat
                    density="comfortable"
                    icon="mdi-minus"
                  ></v-btn>
                </template>
                <template v-slot:append>
                  <v-btn
                    flat
                    density="comfortable"
                    icon="mdi-plus"
                  ></v-btn>
                </template>
              </v-text-field>
            </v-col>
            <v-col cols="5">
              <v-text-field
                hide-details="auto"
                bg-color="primary"
                color="success"
                density="compact"
                label="Profit"
              ></v-text-field>
            </v-col>
          </v-row>
        </v-window-item>

        <v-window-item value="two">Two</v-window-item>

        <v-window-item value="three">Three</v-window-item>
      </v-window>
    </v-card-text>
  </v-card>
  <div class="ma-5">
    <v-btn
      id="search"
      :color="!searching ? 'primary' : 'success'"
      block
      rounded
    >
      {{ setButtonText }}
    </v-btn>

    <v-btn
      id="goToTransferList"
      color="secondary"
      block
      rounded
    >
      Go to transferlist
    </v-btn>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue'

let searching = ref(false)

const setButtonText = computed(() => {
  return searching.value ? 'Stop searching' : 'Start searching'
})

onMounted(() => {
  const searchButton = document.getElementById('search')
  searchButton.addEventListener('click', async () => {
    searching.value = !searching.value
    parent.postMessage(
      { action: 'startSearch', searching: searching.value },
      '*'
    )
  })

  const goToTransferList = document.getElementById('goToTransferList')
  goToTransferList.addEventListener('click', async () => {
    parent.postMessage({ action: 'goToTransferList', searching: false }, '*')
  })
})

let tab = ref('one')
</script>

<style lang="scss" scoped>
.card-title {
  border-top-right-radius: var(--rounded-box, 1rem);
  border-top-left-radius: var(--rounded-box, 1rem);
}

.ut-click-shield {
  background-color: #000c;
  height: 100%;
  justify-content: center;
  align-items: center;
  width: 100%;
  display: flex;
  position: absolute;
  margin-top: -110px;
  z-index: 10000000000000000;

  img {
    height: 36px;
  }
}
</style>
