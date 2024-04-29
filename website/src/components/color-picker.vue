<template>
  <div>
    <div
      id="picker"
      class="border none" style="border: none;"
      
    ></div>
  </div>
</template>

<script lang="ts" setup>
import iro from '@jaames/iro';
import { onMounted, type PropType } from 'vue';
const props = defineProps({
  /**
   * The initial color value.
   * @type {string}
   * @required
   */
  color: {
    type: String,
    required: true,
    validator: (prop: string) => {
      return prop.match(/^#[0-9a-fA-F]{3,6}$/) !== null;
    },
  },
  /**
   * The size of the color picker.
   * @type {number}
   */
  size: {
    type: Number,
    required: false,
    default: 200,
  },
  /**
   * The function called when the color changes.
   * @type {Function}
   */
  onChange: {
    type: Function as PropType<(color: iro.Color) => void>,
    required: false,
  },
});

onMounted(() => {
  const picker = iro.ColorPicker('#picker', {
    width: props.size,
    color: props.color,
  });
  picker.on('color:change', (color: iro.Color) => {
    props.onChange?.(color);
  });
});
</script>
