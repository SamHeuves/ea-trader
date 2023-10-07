<script setup lang="ts"></script>

<template>
  <header aria-label="Site Header">
    <v-toolbar
      color="primary"
      density="compact"
      title="EAFC Trader"
    ></v-toolbar>
  </header>

  <RouterView></RouterView>

  <footer aria-label="Site Footer">Content Script Iframe Footer</footer>
</template>

<style scoped></style>
