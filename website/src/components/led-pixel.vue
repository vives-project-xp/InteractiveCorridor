<script lang="ts" setup>
import { cn } from '@/lib/utils';

type hexColor = string;
const props = defineProps({
  color: {
    type: String as () => hexColor,
    required: true,
    validator: (prop: string) => {
      return prop.match(/^#[0-9a-fA-F]{3,6}$/) !== null;
    },
  },
  class: {
    type: String as () => string,
    default: '',
  },
});
</script>

<template>
    <div :class="cn('size-4', props.class)" :style="{ backgroundColor: props.color }"></div>
</template>
