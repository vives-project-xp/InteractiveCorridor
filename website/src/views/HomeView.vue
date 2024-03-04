<script lang="ts" setup>
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import ColorPicker from '../components/color-picker.vue';
import LedEffect from '@/components/led-effect.vue';
import LedPixel from '@/components/led-pixel.vue';
</script>

<template>
  <div class="flex flex-col md:flex-row">
    <aside>
      <Tabs default-value="color-picker" class="w-[400px]">
        <TabsList>
          <TabsTrigger value="color-picker">Color Picker</TabsTrigger>
          <TabsTrigger value="effects">Effects</TabsTrigger>
        </TabsList>
        <TabsContent value="color-picker">
          <Card>
            <CardHeader>
              <CardTitle>Color picker</CardTitle>
            </CardHeader>
            <CardContent>
              <div class="flex justify-center h-min">
                <ColorPicker
                  :color="selectedColor"
                  :on-change="
                    (color) => {
                      console.log(color);
                    }
                  "
                />
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="effects">
          <Card>
            <CardHeader>
              <CardTitle>TODO</CardTitle>
            </CardHeader>
          </Card>
        </TabsContent>
      </Tabs>
    </aside>
    <hr class="my-5 md:my-0 md:mx-4" />
    <div class="grow">
      <h2 class="text-lg font-bold">Individual lights</h2>

      <div v-if="searching">Searching ledstrips...</div>
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
                <div class="flex items-center rounded">
                  <LedPixel
                    v-for="(ledIndex, ledIndexInBar) in getLedIndices(barIndex, length)"
                    :key="ledIndexInBar"
                    class="first:rounded-l first:border-l last:rounded-r last:border-r border-y"
                    :color="colors[stripIndex - 1][ledIndex]"
                  ></LedPixel>
                </div>
              </template>
            </div>
          </div>
        </div>
      </template>
    </div>
  </div>
</template>

<script lang="ts">
import axios from 'axios';

export default {
  data() {
    return {
      effects: [] as string[] | undefined,
      numberOfStrips: 0,
      brightness: 200,
      selectedColor: '#ff0000',
      selectedStrips: [] as number[],
      colors: [] as string[][],
      barLengths: [15, 10, 10, 15],
      searching: false,
    };
  },
  methods: {
    fetchColors() {
      console.log('fetching colors', this.numberOfStrips);
      for (let i = 0; i < this.numberOfStrips; i++) {
        axios
          .get('http://ic' + (i + 1) + '.local/json/live')
          .then((response) => {
            const colorsObject = response.data.leds;
            const colors = Object.values(colorsObject).map((color) => `#${color}`);
            this.colors[i - 1] = colors;
          })
          .catch(() => {});
      }
    },
    fetchLeds() {
      this.searching = true;
      console.time('fetchLeds');
      axios
        .get('http://localhost:3000/leds')
        .then(async (response) => {
          this.numberOfStrips = response.data;
          console.timeEnd('fetchLeds');
          this.searching = false;
          // this.effects = await this.fetchEffects();
        })
        .catch((error) => {
          this.searching = false;
          console.error(error);
        });
    },
    async fetchEffects() {
      if (this.numberOfStrips === 0) return;
      return axios
        .get('http://ic1.local/json/effects')
        .then((response) => response.data as string[]);
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
    this.fetchLeds();
    this.fetchColors();
    setInterval(this.fetchColors, 100);
    setInterval(this.fetchLeds, 60000);
    this.$watch(
      () => [this.brightness, this.selectedColor, this.selectedStrips],
      () => {
        this.setEffect();
      }
    );
  },
};
</script>
