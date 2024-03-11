<script lang="ts" setup>
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { Button } from '@/components/ui/button';

type LedEffect = string
const props = defineProps({
  effect: {
    type: String as () => LedEffect,
    required: true,
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
      <TooltipTrigger :class="props.class">
        <Button @click="onClick" class="w-full">
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
