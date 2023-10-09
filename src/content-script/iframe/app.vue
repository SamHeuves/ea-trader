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

  <v-footer
    color="primary"
    density="compact"
  >
    <strong>Active session</strong>
  </v-footer>
</template>

<style scoped></style>
