<script setup lang="ts">
import { RouterView } from 'vue-router';
import { BookMarked, Github, Moon, Sun } from 'lucide-vue-next';
import { Button } from '@/components/ui/button';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
</script>

<template>
  <nav class="flex justify-between items-center bg-secondary p-4 md:p-5">
    <span
      class="bg-gradient-to-r from-red-400 to-pink-400 bg-clip-text text-transparent text-xl sm:text-3xl font-bold"
    >
      Interactive Corridor
    </span>
    <TooltipProvider>
      <ul class="flex gap-1 md:gap-4">
        <li>
          <Tooltip>
            <TooltipTrigger as-child>
              <a
                href="https://github.com/vives-project-xp/InteractiveCorridor#readme"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Button variant="outline" class="h-9 px-3 md:h-10 md:px-4">
                  <Github />
                </Button>
              </a>
            </TooltipTrigger>
            <TooltipContent>
              <p>View project on GitHub</p>
            </TooltipContent>
          </Tooltip>
        </li>
        <li>
          <Tooltip>
            <TooltipTrigger as-child>
              <a
                href="https://github.com/vives-project-xp/InteractiveCorridor/tree/main/docs#readme"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Button variant="outline" class="h-9 px-3 md:h-10 md:px-4">
                  <BookMarked />
                </Button>
              </a>
            </TooltipTrigger>
            <TooltipContent>
              <p>Open documentation</p>
            </TooltipContent>
          </Tooltip>
        </li>
        <li>
          <Tooltip>
            <TooltipTrigger as-child>
              <Button variant="outline" class="h-9 px-3 md:h-10 md:px-4" @click="toggleDarkMode">
                <template v-if="isDarkMode">
                  <Moon />
                </template>
                <template v-else>
                  <Sun />
                </template>
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>Toggle theme</p>
            </TooltipContent>
          </Tooltip>
        </li>
      </ul>
    </TooltipProvider>
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
  mounted() {
    this.toggleDarkMode();
  },
};
</script>
