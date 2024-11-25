<script lang="ts" setup>
import { cn } from '@/lib/utils';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';

type hexColor = string;
const props = defineProps({
  colors: {
    type: Array as () => hexColor[],
    required: true,
    validator: (prop: hexColor[]) => {
      return (
        prop.length === 3 && prop.every((color) => color.match(/^#[0-9a-fA-F]{3,6}$/) !== null)
      );
    },
  },
  effect: {
    type: Object as () => { name: string; description: string; id: number },
    required: true,
  },
  class: {
    type: String as () => string,
    default: '',
  },
});
</script>

<template>
  <TooltipProvider>
    <Tooltip>
      <TooltipTrigger as-child>
        <div :class="cn('size-4', props.class)" :style="{ backgroundColor: props.colors[0] }"></div>
      </TooltipTrigger>
      <TooltipContent class="flex flex-col gap-2 max-w-48">
        <div>
          <p class="text-sm">{{ props.effect.name }}</p>
          <p class="text-xs text-wrap">{{ props.effect.description }}</p>
        </div>
        <div class="flex justify-center space-x-1">
          <div v-for="(color, index) in colors" :key="index">
            <code class="bg-muted rounded py-[2px] px-1">{{ color }}</code>
          </div>
          >
        </div>
      </TooltipContent>
    </Tooltip>
  </TooltipProvider>
</template>

<script lang="ts">
export default {
  data() {
    return {
      copyButtonText: 'Copy',
    };
  },
  methods: {
    setButtonText(text: string, duration: number = 2000) {
      const prevText = this.copyButtonText;
      this.copyButtonText = text;
      setTimeout(() => {
        this.copyButtonText = prevText;
      }, duration);
    },
  },
};
</script>
