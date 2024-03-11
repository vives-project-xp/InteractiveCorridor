<script lang="ts" setup>
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { Button, type ButtonVariants } from '@/components/ui/button';
import { cn } from '@/lib/utils';

type LedEffect = string
const props = defineProps({
  effect: {
    type: String as () => LedEffect,
    required: true,
  },
  variant: {
    type: String as () => ButtonVariants['variant'],
    default: 'primary',
  },
  class: {
    type: String as () => string,
    default: '',
  },
});

const onClick = () => {
  console.log('clicked', props.effect);
};
</script>

<template>
  <TooltipProvider>
    <Tooltip>
      <TooltipTrigger as-child>
        <Button @click="onClick" :class="cn('w-full', props.class)" :variant="props.variant">
          <template v-if="!$slots.default">
            {{ props.effect[0].toUpperCase() + props.effect.slice(1).toLowerCase() }}
          </template>
          <slot />
        </Button>
      </TooltipTrigger>
      <TooltipContent>
        <p class="font-bold">
          {{ props.effect[0].toUpperCase() + props.effect.slice(1).toLowerCase() }}
        </p>
      </TooltipContent>
    </Tooltip>
  </TooltipProvider>
</template>
