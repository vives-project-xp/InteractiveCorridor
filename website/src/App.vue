<script setup lang="ts">
import { RouterView } from 'vue-router';
import { BookMarked, Github, Moon, Sun, Lock, Unlock } from 'lucide-vue-next';
import { Button } from '@/components/ui/button';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
</script>

<template>
  <nav class="flex justify-between items-center bg-secondary p-4 md:p-5 visible sm:invisible">
    <span
      class="bg-gradient-to-r from-red-400 to-pink-400 bg-clip-text text-transparent text-xl sm:text-3xl font-bold"
    >
      Interactive Corridor
    </span>
    <div class="flex justify-center items-center">
      <span
        v-if="isAdminMode"
        class="text-red-500 text-2xl md:text-3xl font-extrabold bg-yellow-100 p-4 rounded-lg shadow-lg"
      >
        ADMIN MODE ACTIVE
      </span>
    </div>

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
              <a :href="origin + ':3000'" target="_blank" rel="noopener noreferrer">
                <Button variant="outline" class="h-9 px-3 md:h-10 md:px-4">
                  <BookMarked />
                </Button>
              </a>
            </TooltipTrigger>
            <TooltipContent>
              <p>Open API documentation</p>
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
        <li>
          <Tooltip>
            <TooltipTrigger as-child>
              <Button
                :class="isAdminMode ? 'bg-green-500' : 'bg-red-500'"
                variant="outline"
                class="h-9 px-3 md:h-10 md:px-4"
                @click="toggleAdminMode"
              >
                <template v-if="isAdminMode">
                  <Unlock />
                </template>
                <template v-else>
                  <Lock />
                </template>
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>Toggle AdminMode</p>
            </TooltipContent>
          </Tooltip>
        </li>
      </ul>
    </TooltipProvider>
  </nav>
  <div
    v-if="showPasswordModal"
    class="fixed inset-0 bg-gray-800 bg-opacity-75 flex justify-center items-center modal"
  >
    <div class="bg-white p-6 rounded-lg shadow-md z-50" @click.stop>
      <h3 class="text-xl font-bold mb-4 text-black">Enter Admin Password</h3>
      <input
        type="password"
        v-model="passwordInput"
        class="border p-2 w-full text-black"
        placeholder="Password"
      />
      <div class="mt-4 flex justify-end">
        <button @click="validatePassword" class="bg-blue-500 text-white px-4 py-2 rounded mr-2">
          Submit
        </button>
        <button @click="closeModal" class="bg-gray-500 text-white px-4 py-2 rounded">Cancel</button>
      </div>
    </div>
  </div>
  <main class="p-6 xl:w-[1270px] xl:m-auto z-0">
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
      isAdminMode: document.body.classList.contains('admin'),
      adminPassword: import.meta.env.VITE_ADMIN_PASSWORD,
      showPasswordModal: false,
      passwordInput: '',
      origin: window.location.origin,
    };
  },
  methods: {
    toggleDarkMode() {
      document.body.classList.toggle('dark');
      this.isDarkMode = document.body.classList.contains('dark');
    },
    toggleAdminMode() {
      if (!this.isAdminMode) {
        this.showPasswordModal = true;
      } else {
        document.body.classList.toggle('admin');
        this.isAdminMode = document.body.classList.contains('admin');
      }
    },
    validatePassword() {
      if (this.passwordInput === this.adminPassword) {
        document.body.classList.toggle('admin');
        this.isAdminMode = document.body.classList.contains('admin');
        this.closeModal();
      } else {
        alert('Incorrect password!');
      }
    },
    closeModal() {
      this.showPasswordModal = false;
      this.passwordInput = '';
    },
  },
  mounted() {
    this.toggleDarkMode();
  },
};
</script>
