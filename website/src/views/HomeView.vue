<script lang="ts" setup>
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';
import { Skeleton } from '@/components/ui/skeleton';
import ColorPicker from '@/components/color-picker.vue';
import LedEffect from '@/components/led-effect.vue';
import LedPixel from '@/components/led-pixel.vue';
import { throttle } from '@/lib/utils';

export type Effect = {
  name: string;
  description: string;
  id: number;
};

export type IncomingStrip = {
  index: number;
  name: string;
  segments: {
    start: number;
    end: number;
    color: string;
  }[];
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
                <div v-if="effects === undefined || effects.length === 0" class="h-56 w-full">
                  <div v-for="i in 5" :key="i">
                    <Skeleton class="w-full h-10" />
                    <Separator class="my-2" />
                  </div>
                </div>
                <div v-for="effect in effects || []" :key="effect.id">
                  <LedEffect
                    :effect="effect.name"
                    :tooltip-text="effect.description"
                    class="w-full text-sm"
                    variant="secondary"
                    :onClick="() => setEffect(effect.id)"
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
            <h3>LED-strip {{ strip.name }}</h3>
            <div
              v-for="(segment, barIndex) in strip.segments"
              :key="barIndex"
              class="flex flex-wrap gap-2"
            >
              <!-- Add the shadow class if the segment is in the selectedStrips -->
              <div
                class="flex items-center rounded m-1 cursor-pointer"
                :class="{
                  'shadow-[0px_0px_0px_5px_rgba(109,40,217,0.5)]': selectedStrips.find(
                    (s) => s.index === strip.index && s.segments.includes(barIndex)
                  ),
                }"
                @click="
                  () => {
                    const selectedStrip = selectedStrips.find((s) => s.index === strip.index);
                    if (!selectedStrip) {
                      selectedStrips.push({ index: strip.index, segments: [barIndex] });
                    } else {
                      if (selectedStrip.segments.includes(barIndex)) {
                        selectedStrip.segments.splice(selectedStrip.segments.indexOf(barIndex), 1);
                      } else {
                        selectedStrip.segments.push(barIndex);
                      }
                    }
                  }
                "
              >
                <LedPixel
                  v-for="(ledIndex, ledIndexInBar) in segment.end - segment.start + 1"
                  :key="ledIndexInBar"
                  class="first:rounded-l first:border-l last:rounded-r last:border-r border-y"
                  :color="segment.color || '#000000'"
                ></LedPixel>
              </div>
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
      effects: [] as Effect[] | undefined,
      strips: [] as IncomingStrip[],
      brightness: 200,
      selectedColor: '#ff0000',
      selectedStrips: [] as { index: number; segments: number[] }[],
      searching: false,
    };
  },
  methods: {
    fetchLeds() {
      this.searching = true;
      axios
        .get('http://localhost:3000/leds')
        .then(async (response) => {
          console.log('Got', response.data.length, 'LED strips from the server.');
          this.strips = response.data;
          this.searching = false;
        })
        .catch((error) => {
          this.searching = false;
          console.error(error);
        });
    },
    async fetchEffects() {
      this.effects =
        (await axios
          .get('http://localhost:3000/effect')
          .then((response) => response.data as Effect[])) || [];
      console.log('Effects', this.effects);
      return this.effects;
    },
    setEffect(effect: number) {
      console.log('Setting effect', effect, 'on strips', this.selectedStrips);
      axios
        .post('http://localhost:3000/effect', { effect, strips: this.selectedStrips })
        .catch((error) => {
          console.error(error);
        });
    },
    setColor(color: string) {
      this.selectedColor = color;

      const formData = [];
      for (const strip of this.selectedStrips) {
        const s = this.strips.find((s) => s.index === strip.index);
        if (!s) continue;

        const stripData = {
          index: strip.index,
          segments: [] as { start: number; end: number; color: string }[],
        };
        for (let i = 0; i < s.segments.length; i++) {
          const segment = s.segments[i];

          stripData.segments.push({
            start: segment.start,
            end: segment.end,
            color: strip.segments.includes(i) ? color : segment.color,
          });
        }

        formData.push(stripData);
      }

      console.log('formData', formData);

      // const formData = {
      //   strips: this.selectedStrips,
      //   color,
      //   brightness: Number(this.brightness),
      // };

      axios.post('http://localhost:3000/leds', formData).catch((error) => {
        console.error(error);
      });
    },
  },
  mounted() {
    this.fetchLeds();
    this.fetchEffects();
    setInterval(this.fetchLeds, 1000);
    this.$watch(
      () => [this.brightness, this.selectedColor, this.selectedStrips],
      () => {
        this.setColor(this.selectedColor);
      }
    );
  },
};
</script>
