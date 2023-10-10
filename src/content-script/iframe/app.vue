<script setup lang="ts"></script>

<template>
  <v-app>

  <header aria-label="Site Header">
    <v-toolbar
      color="surface"
      density="compact"
      title="EAFC Trader"
    ></v-toolbar>
  </header>

  <RouterView></RouterView>

  <v-footer
    color="surface"
    density="compact"
  >
    <strong>Active session</strong>
  </v-footer>
  </v-app>
</template>

<style scoped></style>
