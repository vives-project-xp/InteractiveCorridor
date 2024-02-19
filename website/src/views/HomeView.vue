<script setup lang="ts">
import { ref } from 'vue';
import axios from 'axios';

const strip = ref(0); // strip parameter
const color = ref('#ff0000'); // color parameter
const brightness = ref(255); // brightness parameter

// Methode om het effect in te stellen
const seteffect = () => {
  const formdata = {
    strip: strip.value,
    color: color.value,
    brightness: brightness.value
  };
  
  axios.post('http://localhost:3000/color', formdata)
    .then(response => {
      console.log(response.data); // Als je een reactie wilt loggen
    })
    .catch(error => {
      console.error(error); // Als er een fout optreedt bij het verzoek
    });
}
</script>

<template>
  <main>
    <button @click="seteffect">Set Effect</button>
  </main>
</template>
