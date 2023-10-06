<template>
  <div class="text-red font-bold text-xl">Cotnent Script Iframe</div>
  <button id="button"></button>
</template>

<script setup lang="ts">
import { sendMessage } from "webext-bridge/content-script"
const button = document.getElementById('button');

button!.addEventListener("click", async () => {
  const res = await sendMessage(
    "message",
    { ignoreCasing: true },
    "content-script"
  );

  console.log(res)
});
</script>

<style scoped></style>
