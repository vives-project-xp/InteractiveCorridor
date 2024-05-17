<script lang="ts" setup>
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';
import { Checkbox } from '@/components/ui/checkbox';
import { Skeleton } from '@/components/ui/skeleton';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';
import { Input } from '@/components/ui/input';
import ColorPicker from '@/components/color-picker.vue';
import LedEffect from '@/components/led-effect.vue';
import LedStrip, { type SelectedStrip, type IncomingStrip } from '@/components/led-strip.vue';
import { throttle } from '@/lib/utils';
export type Effect = {
  name: string;
  description: string;
  id: number;
  preDefined: number;
};
</script>

<template>
  <div class="flex flex-col md:flex-row gap-4">
    <aside class="m-auto md:m-0 w-full md:w-fit">
      <Tabs default-value="color-picker" class="w-full sticky top-4">
        <TabsList class="w-full">
          <TabsTrigger class="w-full" value="color-picker">Color Picker</TabsTrigger>
          <TabsTrigger class="w-full" value="effects">Effects</TabsTrigger>
          <TabsTrigger class="w-full" value="settings">Settings</TabsTrigger>
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
                  :on-change="(color) => throttle(() => setColor(color.hexString), throttleDelay)"
                />
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="effects">
          <Card>
            <CardContent>
              <CardHeader>
                <CardTitle>Effects</CardTitle>
              </CardHeader>
              <Input
                v-model="effectSearch"
                type="search"
                placeholder="Search"
                class="w-full mb-2"
              />
              <LedEffect
                effect="Solid"
                tooltip-text="Solid color"
                class="w-full text-sm"
                variant="secondary"
                :onClick="() => setEffect('effect', 0)"
              />
              <ScrollArea class="h-40 w-full p-3 rounded-md border">
                <div v-if="effects === undefined || effects.length === 0" class="h-56 w-full">
                  <div v-for="i in 5" :key="i">
                    <Skeleton class="w-full h-10" />
                    <Separator class="my-2" />
                  </div>
                </div>
                <div
                  v-for="effect in effects?.filter((e) =>
                    e.name.toLowerCase().includes(effectSearch.toLocaleLowerCase())
                  ) || []"
                  :key="effect.id"
                >
                  <LedEffect
                    :effect="effect.name"
                    :tooltip-text="effect.description"
                    class="w-full text-sm"
                    variant="secondary"
                    :onClick="() => setEffect('effect', effect.id)"
                  />
                  <Separator class="my-2" />
                </div>
              </ScrollArea>
              <CardHeader>
                <CardTitle>OwnEffects</CardTitle>
              </CardHeader>
              <Input
                v-model="dbeffectSearch"
                type="search"
                placeholder="Search"
                class="w-full mb-2"
              />
              <ScrollArea class="h-40 w-full p-3 rounded-md border">
                <div v-if="dbeffects === undefined || dbeffects.length === 0" class="h-56 w-full">
                  <div v-for="i in 5" :key="i">
                    <Skeleton class="w-full h-10" />
                    <Separator class="my-2" />
                  </div>
                </div>
                <div
                  v-for="effect in dbeffects?.filter((e) =>
                    e.name.toLowerCase().includes(dbeffectSearch.toLocaleLowerCase())
                  ) || []"
                  :key="effect.id"
                >
                  <div class="flex items-center w-40 justify-between h-[50px] ml-2 mr-2">
                    <LedEffect
                      :effect="effect.name"
                      :tooltip-text="effect.description"
                      class="w-full text-sm overflow-hidden"
                      variant="secondary"
                      :onClick="() => loadEffect(effect.name)"
                    />
                    <button
                      v-if="effect.preDefined !== 1"
                      @click="deleteEffect(effect.name)"
                      class="text-red-600 hover:text-red-800"
                    >
                      <img src="../../img/delete.png" alt="Delete" class="ml-2 h-10 mr-2" />
                    </button>
                  </div>
                  <Separator class="my-2" />
                </div>
              </ScrollArea>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="settings">
          <Card>
            <CardHeader>
              <CardTitle>Settings</CardTitle>
            </CardHeader>
            <CardContent>
              <div class="flex flex-col gap-4 h-min">
                <div>
                  <label for="speedSlider">Speed: {{ speed[0] }}</label>
                  <Slider
                    v-model="speed"
                    id="speedSlider"
                    label="Speed"
                    class="w-full pt-2"
                    :min="1"
                    :step="1"
                    :max="255"
                    @update:model-value="
                      throttle(() => setEffect('speed', speed[0]), throttleDelay)
                    "
                  />
                </div>
                <div>
                  <label for="intensitySlider">Intensity: {{ intensity[0] }}</label>
                  <Slider
                    v-model="intensity"
                    id="intensitySlider"
                    label="Intensity"
                    class="w-full pt-2"
                    :min="1"
                    :step="1"
                    :max="255"
                    @update:model-value="
                      throttle(() => setEffect('intensity', intensity[0]), throttleDelay)
                    "
                  />
                </div>
                <div>
                  <label for="delaySlider">Delay: {{ delay[0] }}</label>
                  <Slider
                    v-model="delay"
                    id="delaySlider"
                    label="Delay"
                    class="w-full pt-2"
                    :min="1"
                    :step="1"
                    :max="1000"
                    @update:model-value="
                      throttle(() => setEffect('delay', delay[0]), throttleDelay)
                    "
                  />
                </div>

                <div class="flex justify-between">
                  <label for="reverseDelay">Reverse Delay</label>
                  <Checkbox
                    id="reverseDelay"
                    class="self-center"
                    @update:checked="(e) => setEffect('reverseDelay', e.valueOf())"
                  />
                </div>
                <div class="flex justify-between">
                  <label for="mirror">Mirror</label>
                  <Checkbox
                    id="mirror"
                    class="self-center"
                    @update:checked="(e) => setEffect('mirror', e.valueOf())"
                  />
                </div>
                <div class="flex justify-between">
                  <label for="reverse">Reverse</label>
                  <Checkbox
                    id="reverse"
                    class="self-center"
                    @update:checked="(e) => setEffect('reverse', e.valueOf())"
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </aside>
    <Card class="grow">
      <CardHeader class="flex flex-row justify-between items-start p-4">
        <div class="flex flex-col gap-y-1.5">
          <CardTitle>
            <span> Individual lights </span>
          </CardTitle>
          <CardDescription>
            Click on a segment to select it. Click on the 'All' button to select all segments.
          </CardDescription>
        </div>
        <Button @click="selectAll" variant="secondary">Select all</Button>
      </CardHeader>
      <CardContent>
        <ScrollArea class="h-[500px] w-full p-2.5 rounded-md border">
          <div class="flex flex-col gap-4">
            <template v-for="strip in strips" :key="strip.index">
              <LedStrip
                class="grow shadow-md"
                :strip
                :effects="effects ? effects : []"
                :selectedSegments="
                  selectedStrips.find((s) => s.index === strip.index)?.segments || []
                "
                @strip-select="
                  (strip, barIndex) => {
                    const selectedStrip = selectedStrips.find((s) => s.index === strip.index);
                    if (!selectedStrip) {
                      selectedStrips.push({
                        index: strip.index,
                        name: strip.name,
                        segments: [barIndex],
                      });
                    } else {
                      if (selectedStrip.segments.includes(barIndex)) {
                        selectedStrip.segments.splice(selectedStrip.segments.indexOf(barIndex), 1);
                      } else {
                        selectedStrip.segments.push(barIndex);
                      }
                    }
                  }
                "
                @split="splitStrip"
              />
            </template>
          </div>
        </ScrollArea>
        <div class="flex max-w-xs gap-1">
          <Input
            type="text"
            placeholder="Effect name"
            v-model="ownEffectName"
            class="px-4 py-2 mr-2 inline-block"
          />
          <Button
            :disabled="ownEffectName === ''"
            @click="saveEffect(ownEffectName)"
            variant="default"
          >
            Save effect
          </Button>
        </div>
      </CardContent>
    </Card>
  </div>
</template>

<script lang="ts">
import axios from 'axios';

export default {
  data() {
    return {
      effects: [] as Effect[] | undefined,
      dbeffects: [] as Effect[] | undefined,
      strips: [] as IncomingStrip[],
      brightness: 200,
      selectedColor: '#ffffff',
      selectedStrips: [] as SelectedStrip[],
      effectSearch: '',
      dbeffectSearch: '',
      ownEffectName: '',
      remoteURL: import.meta.env.VITE_BACKEND_URL,
      effectid: 0,
      speed: [128],
      intensity: [128],
      delay: [0],
      throttleDelay: 100,
    };
  },
  methods: {
    fetchLeds() {
      axios
        .get(`${this.remoteURL}/leds`, { timeout: 250 })
        .then(async (response) => {
          // Check if the response is an array
          if (!Array.isArray(response.data)) {
            console.error('Invalid response:', response.data);
            return;
          }
          this.strips = response.data;
        })
        .catch(() => {});
    },
    async fetchEffects() {
      try {
        // Haal de effecten op van 'http://localhost/api/effect'
        const response1 = await axios.get(`${this.remoteURL}/effects`);
        this.effects = response1.data.sort((a: { name: string }, b: { name: string }) =>
          a.name.localeCompare(b.name)
        );

        // Haal de effecten op van 'http://localhost/api/db/effects'
        const response2 = await axios.get(`${this.remoteURL}/db/effects`);
        console.log(response2.data);
        this.dbeffects = response2.data.sort(
          (a: { name: string; preDefined: number }, b: { name: string; preDefined: number }) => {
            // First, check if either of the effects has preDefined set to 1
            if (a.preDefined === 1 && b.preDefined !== 1) {
              return -1;
            }
            if (a.preDefined !== 1 && b.preDefined === 1) {
              return 1;
            }
            // If both have the same preDefined value, sort by name
            return a.name.localeCompare(b.name);
          }
        );
      } catch (error) {
        console.error('Error fetching effects:', error);
      }
    },

    setEffect(option?: string, value?: any) {
      if (this.selectedStrips.length === 0) return;

      const data: any = {
        strips: this.selectedStrips,
      };
      if (option !== undefined && value !== undefined) {
        data[option] = value;
      }
      axios.post(`${this.remoteURL}/effects`, data).catch((error) => {
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

      axios.post(`${this.remoteURL}/leds`, formData).catch((error) => {
        console.error(error);
      });
    },

    splitStrip(strip: IncomingStrip) {
      const data = { strip: strip };
      axios.post(`${this.remoteURL}/changeled`, data).catch((error) => {
        console.error(error);
      });

      const selectedStrip = this.selectedStrips.find((s) => s.index === strip.index);
      if (selectedStrip) selectedStrip.segments = [];
    },

    saveEffect(ownEffectName: string) {
      axios.get<{ name: string }[]>(`${this.remoteURL}/db/effects`).then((response) => {
        const existingEffects = response.data.map((effect) => effect.name);
        if (existingEffects.includes(ownEffectName)) {
          alert('Effect name already exists!');
          return;
        }

        axios.post(`${this.remoteURL}/saveeffect`, { name: ownEffectName }).then(() => {
          this.fetchEffects();
        });
      });
    },

    async deleteEffect(effectName: string) {
      const confirmDelete = confirm(`Are you sure you want to remove the effect '${effectName}'?`);

      if (confirmDelete) {
        try {
          const response = await axios.delete(`${this.remoteURL}/deleteeffect`, {
            data: { name: effectName },
          });

          if (response.status === 200) {
            console.log(`Effect '${effectName}' successfully deleted`);
            this.fetchEffects();
          }
        } catch (error) {
          console.error('Error removing effect:', error);
        }
      } else {
        console.log('Deletion cancelled');
      }
    },

    async loadEffect(_name: string) {
      const data: any = {
        name: _name,
      };

      await axios.post(`${this.remoteURL}/loadeffect`, data).catch((error) => {
        console.error(error);
      });
    },
    selectAll() {
      // If one is selected, deselect all
      if (this.selectedStrips.length !== 0) {
        this.selectedStrips = [];
        return;
      }

      this.selectedStrips = this.strips.map((strip) => ({
        index: strip.index,
        name: strip.name,
        segments: strip.segments.map((_, i) => i),
      }));
    },
  },
  mounted() {
    document.body.classList.add('bg-background');
    this.fetchLeds();
    this.fetchEffects();
    setInterval(this.fetchLeds, 250);
    this.$watch(
      () => [this.brightness, this.selectedColor, this.selectedStrips],
      () => {
        this.setColor(this.selectedColor);
      }
    );
  },
};
</script>
