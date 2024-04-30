<script lang="ts" setup>
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardDescription, CardTitle } from '@/components/ui/card';
import LedPixel from '@/components/led-pixel.vue';
import { cn } from '@/lib/utils';

export type SelectedStrip = { index: number; name: string; segments: number[] };

export type IncomingStrip = {
  index: number;
  name: string;
  segments: {
    start: number;
    end: number;
    length: number;
    effect: number;
    color: string;
  }[];
};

const props = defineProps({
  strip: {
    type: Object as () => IncomingStrip,
    required: true,
  },
  effects: {
    type: Array as () => any[],
    required: true,
  },
  class: {
    type: String as () => string,
    default: '',
  },
});
</script>

<template>
  <Card :class="cn('', props.class)">
    <CardHeader class="flex flex-row justify-between">
      <CardTitle class="flex items-center">{{ props.strip.name }}</CardTitle>
      <CardDescription><Button variant="secondary">Split</Button></CardDescription>
    </CardHeader>
    <CardContent>
      <div class="flex flex-wrap">
        <div
          v-for="(segment, barIndex) in props.strip.segments"
          :key="barIndex"
          class="flex flex-wrap gap-2"
        >
          <div
            class="flex items-center rounded m-1 cursor-pointer"
            
            @click="
              () => {
              //   const selectedStrip = selectedStrips.find((s) => s.index === strip.index);
              //   if (!selectedStrip) {
              //     selectedStrips.push({ index: strip.index, segments: [barIndex] });
              //   } else {
              //     if (selectedStrip.segments.includes(barIndex)) {
              //       selectedStrip.segments.splice(selectedStrip.segments.indexOf(barIndex), 1);
              //     } else {
              //       selectedStrip.segments.push(barIndex);
              //     }
              //   }
              }
            "
          >
            <LedPixel
              v-for="(ledIndex, ledIndexInBar) in segment.end - segment.start + 1"
              :key="ledIndexInBar"
              class="first:rounded-l first:border-l last:rounded-r last:border-r border-y"
              :color="segment.color || '#000000'"
              :effect="
                props.effects?.find((e) => Number(e.id) === segment.effect) || {
                  name: 'Unknown',
                  description: 'Unknown',
                  id: -1,
                }
              "
            ></LedPixel>
          </div>
        </div>
      </div>
    </CardContent>
  </Card>
</template>

<script lang="ts">
export default {
  data() {
    return {};
  },
  methods: {},
};
</script>
