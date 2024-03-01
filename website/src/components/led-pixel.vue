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
      <TooltipContent class="space-x-1">
        <code class="bg-muted rounded py-[2px] px-1">{{ props.color }}</code>
        <Button variant="secondary" class="py-[2px] px-1 h-5 text-xs" @click="() => copyToClipboard(props.color)">
          Copy
        </Button>
      </TooltipContent>
    </Tooltip>
  </TooltipProvider>
</template>
