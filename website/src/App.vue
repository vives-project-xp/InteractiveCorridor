<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router';

const navItemClass = 'text-primary-foreground border border-opacity-5 px-3 py-2 rounded';
</script>

<template>
  <nav class="flex justify-between items-center p-5 bg-primary">
    <span class="bg-gradient-to-r from-red-400 to-pink-400 bg-clip-text text-transparent text-3xl font-bold">
      Interactive Corridor
    </span>
    <ul>
      <li>
        <!-- <RouterLink to="/" :class="navItemClass">Home</RouterLink> -->
      </li>
    </ul>
  </nav>

  <main class="w-4/5 m-auto">
    <RouterView />
  </main>
</template>

<style scoped></style>
