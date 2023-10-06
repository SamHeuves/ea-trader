<template>
  <div class="flex items-center gap-4 p-4">
    <img class="w-12 h-12 rounded-full" src="https://cdn.futwiz.com/assets/img/fc24/faces/253072.png">
    <div class="flex flex-col">
      <strong>Darwin Nuñez (82)</strong>
      <span>8,300, 2 minutes ago</span>
    </div>
  </div>

  <v-card>
    <v-tabs v-model="tab" bg-color="primary" class="mb-sm" grow>
      <v-tab value="one">Item One</v-tab>
      <v-tab value="two">Item Two</v-tab>
      <v-tab value="three">Item Three</v-tab>
    </v-tabs>

    <v-card-text>
      <v-window v-model="tab">
        <v-window-item value="one">
          <v-row>
            <v-col cols="7">
              <v-text-field hide-details="auto" type="number" bg-color="primary" color="success" density="compact"
                label="Selling price">
                <template v-slot:prepend>
                  <v-btn flat density="comfortable" icon="mdi-minus"></v-btn>
                </template>
                <template v-slot:append>
                  <v-btn flat density="comfortable" icon="mdi-plus"></v-btn>
                </template>
              </v-text-field>
            </v-col><v-col cols="5">
              <v-text-field hide-details="auto" bg-color="primary" color="success" density="compact" label="Profit">
              </v-text-field>
            </v-col>
          </v-row>
        </v-window-item>

        <v-window-item value="two">
          Two
        </v-window-item>

        <v-window-item value="three">
          Three
        </v-window-item>
      </v-window>
    </v-card-text>
  </v-card>
  <div class="ma-5">
    <v-btn id="button" :class="!searching ? 'btn-primary w-100' : 'btn-active w-100'" rounded variant="outlined">
      {{ setButtonText }}
    </v-btn>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue'

let searching = ref(false);

const setButtonText = computed(() => {
  return searching.value ? 'Stop searching' : 'Start searching'
});

onMounted(() => {
  const button = document.getElementById('button');
  if (button != null) {
    button.addEventListener("click", async () => {
      searching.value = !searching.value;
      parent.postMessage({ action: 'startSearch', searching: searching.value }, '*')
    });
  } else {
    console.log('no button')
  }
});

let tab = ref('one');

</script>

<style lang="scss" scoped>
.card-title {
  border-top-right-radius: var(--rounded-box, 1rem);
  border-top-left-radius: var(--rounded-box, 1rem);
}
</style>
