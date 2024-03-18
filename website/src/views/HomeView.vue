<script lang="ts" setup>
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';
import ColorPicker from '@/components/color-picker.vue';
import LedEffect from '@/components/led-effect.vue';
import LedPixel from '@/components/led-pixel.vue';
import { throttle } from '@/lib/utils';

export type IncomingStrip = {
  index: number;
  state: {
    on: boolean;
    bri: number;
    seg: {
      id: number;
      start: number;
      stop: number;
      len: number;
      grp: number;
      spc: number;
      of: number;
      on: boolean;
      frz: boolean;
      bri: number;
      cct: number;
      set: number;
      col: number[][];
      fx: number;
      sx: number;
      ix: number;
      pal: number;
      c1: number;
      c2: number;
      c3: number;
      sel: boolean;
      rev: boolean;
      mi: boolean;
      o1: boolean;
      o2: boolean;
      o3: boolean;
      si: number;
      m12: number;
    }[];
  };
};
</script>

<template>
  <div class="flex flex-col md:flex-row my-7">
    <aside>
      <Tabs default-value="color-picker" class="w-[300px]">
        <TabsList class="w-full">
          <TabsTrigger class="w-full" value="color-picker">Color Picker</TabsTrigger>
          <TabsTrigger class="w-full" value="effects">Effects</TabsTrigger>
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
                  :on-change="(color) => throttle(() => setColor(color.hexString), 100)"
                />
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="effects">
          <Card>
            <CardHeader>
              <CardTitle>Effects</CardTitle>
            </CardHeader>
            <CardContent>
              <ScrollArea class="h-56 w-full p-3 rounded-md border">
                <div v-for="effect in effects || []" :key="effect">
                  <LedEffect
                    :effect="effect"
                    class="w-full text-sm"
                    variant="secondary"
                    :onClick="() => setEffect(effect)"
                  />
                  <Separator class="my-2" />
                </div>
              </ScrollArea>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </aside>
    <hr class="my-5 md:my-0 md:mx-4" />
    <div class="grow">
      <h2 class="text-2xl font-semibold leading-none tracking-tight my-3">
        Individual lights
        <span v-if="searching">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger class="text-red-500">°</TooltipTrigger>
              <TooltipContent>Searching for LED strips...</TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </span>
      </h2>

      <template v-for="strip in strips" :key="strip.index">
        <div class="mb-5">
          <div>
            <h3>LED-strip {{ strip.index }}</h3>
            <div v-if="colors[strip.index]?.length > 0" class="flex flex-wrap gap-2">
              <template v-for="(segment, barIndex) in strip.state.seg" :key="barIndex">
                <div
                  class="flex items-center rounded m-1 cursor-pointer"
                  :class="{
                    'shadow-[0px_0px_0px_5px_rgba(109,40,217,0.5)]':
                      selectedStrips[strip.index]?.includes(barIndex),
                  }"
                  @click="
                    () => {
                      if (!selectedStrips[strip.index]) selectedStrips[strip.index] = [];
                      const selectedStrip = selectedStrips[strip.index];

                      if (selectedStrip.includes(barIndex)) {
                        selectedStrip.splice(selectedStrip.indexOf(barIndex), 1);
                      } else {
                        selectedStrip.push(barIndex);
                      }
                    }
                  "
                >
                  <LedPixel
                    v-for="(ledIndex, ledIndexInBar) in segment.len"
                    :key="ledIndexInBar"
                    class="first:rounded-l first:border-l last:rounded-r last:border-r border-y"
                    :color="colors[strip.index][segment.start + ledIndex - 1] || '#000000'"
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
      strips: [] as IncomingStrip[],
      brightness: 200,
      selectedColor: '#ff0000',
      selectedStrips: [] as number[][],
      colors: [] as string[][],
      searching: false,
    };
  },
  methods: {
    fetchColors() {
      const updatedColors = [];
      for (const strip of this.strips) {
        updatedColors.push(strip.index);
        axios
          .get('http://ic' + Number(strip.index) + '.local/json/live')
          .then((response) => {
            const colorsObject = response.data.leds;
            const colors = Object.values(colorsObject).map((color) => `#${color}`);
            this.colors[strip.index] = colors;
          })
          .catch(() => {});
      }

      // Remove colors for LED strips that are no longer available
      for (const stripIndex in this.colors) {
        if (!updatedColors.includes(Number(stripIndex))) {
          delete this.colors[stripIndex];
        }
      }
    },
    fetchLeds() {
      this.searching = true;
      axios
        .get('http://localhost:3000/leds')
        .then(async (response) => {
          console.log('Got', response.data.length, 'LED strips from the server.');
          this.strips = response.data;
          this.searching = false;
          this.effects = await this.fetchEffects();
        })
        .catch((error) => {
          this.searching = false;
          console.error(error);
        });
    },
    async fetchEffects() {
      if (this.strips.length === 0) return;
      return axios
        .get('http://ic' + this.strips[0].index + '.local/json/effects')
        .then((response) => response.data as string[]);
    },
    setEffect(effect: string | number) {
      if (this.effects === undefined) return console.warn('Effects not loaded yet');

      const effectID = typeof effect === 'number' ? effect : this.effects.indexOf(effect);
      if (effectID === -1) return console.warn('Effect not found');
      console.log('Setting effect', effectID, 'on strips', this.selectedStrips);
      axios
        .post('http://localhost:3000/effect', { effect: effectID, strips: this.selectedStrips })
        .catch((error) => {
          console.error(error);
        });
    },
    setColor(color: string) {
      const formData = {
        strips: this.selectedStrips,
        color,
        brightness: Number(this.brightness),
      };

      axios.post('http://localhost:3000/color', formData).catch((error) => {
        console.error(error);
      });
    },
  },
  mounted() {
    this.fetchLeds();
    this.fetchColors();
    setInterval(this.fetchColors, 100);
    setInterval(this.fetchLeds, 5000);
    this.$watch(
      () => [this.brightness, this.selectedColor, this.selectedStrips],
      () => {
        this.setColor(this.selectedColor);
      }
    );
  },
};
</script>
