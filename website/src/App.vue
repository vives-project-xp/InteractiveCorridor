<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router';
import { Button } from '@/components/ui/button';
import { Computer } from 'lucide-vue-next';

const navItemClass = 'text-primary-foreground border border-opacity-5 px-3 py-2 rounded';

const toggleDarkMode = () => {
  document.body.classList.toggle('dark');
};
</script>

<template>
  <nav class="flex justify-between items-center p-5 bg-secondary">
    <span
      class="bg-gradient-to-r from-red-400 to-pink-400 bg-clip-text text-transparent text-3xl font-bold"
    >
      Interactive Corridor
    </span>
    <ul>
      <li>
        <!-- <RouterLink to="/" :class="navItemClass">Home</RouterLink> -->
      </li>
      <li>
        <Button @click="toggleDarkMode"><Computer /></Button>
      </li>
    </ul>
  </nav>

  <main class="w-4/5 m-auto">
    <RouterView />
  </main>
</template>

<style scoped></style>
