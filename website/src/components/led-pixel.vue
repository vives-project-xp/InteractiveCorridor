<script lang="ts" setup>
import { cn, copyToClipboard } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';

type hexColor = string;
const props = defineProps({
  color: {
    type: String as () => hexColor,
    required: true,
    validator: (prop: string) => {
      return prop.match(/^#[0-9a-fA-F]{3,6}$/) !== null;
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
        <div :class="cn('size-4', props.class)" :style="{ backgroundColor: props.color }"></div>
      </TooltipTrigger>
      <TooltipContent>
        <div class="space-x-1">
          <code class="bg-muted rounded py-[2px] px-1">{{ props.color }}</code>
          <Button
          variant="secondary"
          class="py-[2px] px-1 h-5 text-xs"
          @click="
            () => {
              console.log('copying', props.color);
              setButtonText('Copied!', 1000);
              copyToClipboard(props.color);
            }
          "
        >
          {{ copyButtonText }}
        </Button>
      </div>
      <div class="mt-1">
        <p class="text-sm">{{ props.effect.name }}</p>
        <p class="text-xs">{{ props.effect.description }}</p>
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
