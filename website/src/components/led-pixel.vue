<script lang="ts" setup>
import { cn } from '@/lib/utils';

type hexColor = string;
const props = defineProps({
  color: {
    type: String as () => hexColor,
    required: true,
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
