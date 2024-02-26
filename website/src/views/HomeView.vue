<script lang="ts" setup>
import ColorPicker from '../components/color-picker.vue';
</script>

<template>
  <div class="flex flex-col md:flex-row">
    <aside>
      <h2 class="text-lg font-bold">Color picker</h2>
      <div>
        <ColorPicker
          :color="selectedColor"
          :on-change="
            (color) => {
              console.log(color);
            }
          "
        />
      </div>

      <h2 class="text-lg font-bold">Helderheid</h2>
      <div>
        <input type="range" id="brightness" min="0" max="255" v-model="brightness" />
      </div>
    </aside>
    <hr class="my-5 md:my-0 md:mx-4" />
    <div class="grow">
      <h2 class="text-lg font-bold">Individual lights</h2>
      <div>
        <label for="numberOfStrips">Aantal LED-strips:</label>
        <input type="number" id="numberOfStrips" min="0" max="16" v-model.number="numberOfStrips" />
      </div>

      <template v-for="stripIndex in numberOfStrips" :key="stripIndex">
        <div
          class="mb-5 cursor-pointer"
          :class="{ 'bg-blue-200': isSelected(stripIndex) }"
          @click="toggleStrip(stripIndex)"
        >
          <div>
            <h3>LED-strip {{ stripIndex }}</h3>
            <div v-if="colors[stripIndex - 1]?.length > 0" class="flex flex-wrap gap-2">
              <template v-for="(length, barIndex) in barLengths" :key="barIndex">
                <div class="flex items-center">
                  <div
                    v-for="(ledIndex, ledIndexInBar) in getLedIndices(barIndex, length)"
                    :key="ledIndexInBar"
                    class="w-4 h-4"
                    :style="{ backgroundColor: colors[stripIndex - 1][ledIndex] }"
                  ></div>
                </div>
              </template>
            </div>
          </div>
        </div>
      </template>
    </div>
    <hr class="my-5 md:my-0 md:mx-4" />
    <aside>
      <h2 class="text-lg font-bold">Effects</h2>
    </aside>
  </div>
</template>

<script lang="ts">
import axios from 'axios';

export default {
  data() {
    return {
      numberOfStrips: 1,
      brightness: 200,
      selectedColor: '#ff0000',
      selectedStrips: [] as number[],
      colors: [] as string[][],
      barLengths: [15, 10, 10, 15],
    };
  },
  methods: {
    fetchColors() {
      for (let i = 1; i <= this.numberOfStrips; i++) {
        axios
          .get('http://ic' + i + '.local/json/live')
          .then((response) => {
            const colorsObject = response.data.leds;
            const colors = Object.values(colorsObject).map((color) => `#${color}`);
            this.colors[i - 1] = colors;
          })
          .catch(() => {});
      }
    },
    toggleStrip(stripIndex: number) {
      if (this.isSelected(stripIndex)) {
        // If strip is already selected, deselect it
        this.selectedStrips = this.selectedStrips.filter((strip) => strip !== stripIndex);
      } else {
        // Otherwise, select it
        this.selectedStrips.push(stripIndex);
      }

      // Check if the color is changed before calling setEffect
      const previousColor = this.colors[this.selectedStrips[0] - 1][0]; // Assuming all LEDs in the strip have the same color
      if (this.selectedStrips.length > 0 && previousColor !== this.selectedColor) {
        this.setEffect(); // Call setEffect method to apply changes
      }
    },

    isSelected(stripIndex: number) {
      return this.selectedStrips.includes(stripIndex);
    },
    updateStripsColor() {
      if (this.selectedStrips.length > 0) {
        // Update the color of selected LED strips only when the color is changed in the color picker
        this.setEffect();
      }
    },
    setEffect() {
      const formData = {
        strips: this.selectedStrips,
        color: this.selectedColor,
        brightness: Number(this.brightness),
      };

      axios.post('http://localhost:3000/color', formData).catch((error) => {
        console.error(error);
      });
    },
    getLedIndices(barIndex: number, length: number) {
      const startIndex = this.barLengths.slice(0, barIndex).reduce((acc, val) => acc + val, 0);
      return Array.from({ length }, (_, i) => startIndex + i);
    },
  },
  mounted() {
    this.fetchColors();
    setInterval(this.fetchColors, 100);
    this.$watch(
      () => [this.brightness, this.selectedColor, this.selectedStrips],
      () => {
        this.setEffect();
      }
    );
  },
};
</script>
