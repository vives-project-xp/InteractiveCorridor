<script setup lang="ts">
import { RouterView } from 'vue-router';
import { Button } from '@/components/ui/button';
import { Moon, Sun } from 'lucide-vue-next';
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
        <Button variant="outline" @click="toggleDarkMode">
          <template v-if="isDarkMode">
            <Moon />
          </template>
          <template v-else>
            <Sun />
          </template>
        </Button>
      </li>
    </ul>
  </nav>

  <main class="p-6 xl:w-[1250px] xl:m-auto">
    <RouterView />
  </main>
</template>

<style scoped></style>

<script lang="ts">
export default {
  components: {
    Sun,
    Moon,
  },
  data() {
    return {
      isDarkMode: document.body.classList.contains('dark'),
    };
  },
  methods: {
    toggleDarkMode() {
      document.body.classList.toggle('dark');
      this.isDarkMode = document.body.classList.contains('dark');
    },
  },
};
</script>
