<template>
  <div>
    <div id="picker" class="w-60 border border-white"></div>
  </div>
</template>

<script lang="ts" setup>
import iro from '@jaames/iro';
import { onMounted, type PropType } from 'vue';
let props = defineProps({
  color: {
    type: String,
    required: true,
    validator: (prop: string) => {
      return prop.match(/^#[0-9a-fA-F]{3,6}$/) !== null;
    },
  },
  onChange: {
    type: Function as PropType<(color: iro.Color) => void>,
    required: false,
  },
});

onMounted(() => {
  const picker = iro.ColorPicker('#picker', {
    width: 200,
    color: props.color,
  });
  picker.on('color:change', (color: iro.Color) => {
    props.onChange?.(color);
  });
});
</script>
