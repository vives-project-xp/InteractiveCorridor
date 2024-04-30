<script lang="ts" setup>
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardDescription, CardTitle } from '@/components/ui/card';
import LedPixel from '@/components/led-pixel.vue';
import { cn } from '@/lib/utils';
import type { PropType } from 'vue';

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
  selectedSegments: {
    type: Array as () => number[],
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
  onStripSelect: {
    type: Function as PropType<(strip: SelectedStrip, barIndex: number) => void>,
    required: true,
  },
  onSplit: {
    type: Function as PropType<(strip: IncomingStrip) => void>,
    required: true,
  },
});
</script>

<template>
  <Card :class="cn('', props.class)">
    <CardHeader class="flex flex-row justify-between">
      <CardTitle class="flex items-center">{{ props.strip.name }}</CardTitle>
      <CardDescription class="flex gap-2">
        <Button variant="secondary" @click="() => onSplit(strip)">Split</Button>
        <Button
          variant="secondary"
          @click="
            () => {
              const toggleAll = props.selectedSegments.length === 0;
              props.strip.segments.forEach(
                (_, i) =>
                  (props.selectedSegments.includes(i) || toggleAll) &&
                  props.onStripSelect(
                    {
                      index: props.strip.index,
                      name: props.strip.name,
                      segments: props.strip.segments.map((_, i) => i),
                    },
                    i
                  )
              );
            }
          "
          >All</Button
        >
      </CardDescription>
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
            :class="{
              'shadow-[0px_0px_0px_5px_rgba(109,40,217,0.5)]': selectedSegments.includes(barIndex),
            }"
            @click="
              () => {
                props.onStripSelect(
                  {
                    index: props.strip.index,
                    name: props.strip.name,
                    segments: props.strip.segments.map((_, i) => i),
                  },
                  barIndex
                );
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
