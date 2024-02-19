<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router';

const navItemClass = 'text-primary-foreground';
</script>

<template>
  <nav class="flex justify-between p-5 bg-primary">
    <span class="text-primary-foreground">Interactive Corridor</span>
    <ul>
      <li :class="navItemClass">
        <RouterLink to="/">Home</RouterLink>
      </li>
    </ul>
  </nav>

  <main class="w-4/5 m-auto">
    <RouterView />
  </main>
</template>

<style scoped>

</style>
