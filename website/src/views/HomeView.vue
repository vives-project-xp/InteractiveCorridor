<template>
  <main>
    <div>
      <label for="brightness">Helderheid: </label>
      <input type="range" id="brightness" min="0" max="255" v-model="brightness">
    </div>

    <div>
      <label for="colorPicker">Kies een kleur:</label>
      <input type="color" id="colorPicker" v-model="selectedColor">
    </div>

    <div v-if="colors.length > 0">
      <div v-for="(color, index) in colors" :key="index" :style="{ display: 'inline-block' }" >
        <div v-if="index %5==0" :key="index" :style="{ backgroundColor: color, width: '35px', height: '15px', display: 'inline-block', margin: '5px' }"></div>
      </div>
    </div>

    <div>
      <label for="ledStrip">Selecteer LED-strip:</label>
      <select id="ledStrip" v-model="selectedStrip">
        <option value="0">Beide strips</option>
        <option value="1">Enkel de eerste strip</option>
        <option value="2">Enkel de tweede strip</option>
      </select>
    </div>
  </main>
</template>

<script>
import { ref } from 'vue';
import axios from 'axios';

export default {
  data() {
    return {
      brightness: 200,
      selectedColor: '#ff0000',
      selectedStrip: 0,
      colors: []
    };
  },
  methods: {
    fetchColors() {
      axios.get('http://ic2.local/json/live')
        .then(response => {
          // Assuming response.data is an array of color values (e.g., ["#FF0000", "#00FF00", "#0000FF"])
          this.colors = response.data;
          const colorsObject = response.data.leds; // Haal het object met kleursleutel-waardeparen op
          this.colors = Object.values(colorsObject).map(color => `#${color}`);
        })
        .catch(error => {
          console.error('Error fetching colors:', error);
        });
    },
    seteffect() {
      const formdata = {
        strip: this.selectedStrip, 
        color: this.selectedColor, 
        brightness: this.brightness 
      };
      
      axios.post('http://localhost:3000/color', formdata)
        .then(response => {
        })
        .catch(error => {
          console.error(error); // Als er een fout optreedt bij het verzoek
        });
    }
  },
  mounted() {
    this.fetchColors();
    setInterval(this.fetchColors, 1); // Fetch colors every second
    // We gebruiken een watcher om de effecten automatisch bij te werken wanneer de gebruiker de instellingen wijzigt
    this.$watch(() => [this.brightness, this.selectedColor, this.selectedStrip], () => {
      this.seteffect();
    });
  }
};
</script>