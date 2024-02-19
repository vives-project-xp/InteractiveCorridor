<template>
  <main>
    <div>
      <label for="numberOfStrips">Aantal LED-strips:</label>
      <input type="number" id="numberOfStrips" v-model.number="numberOfStrips" />
    </div>

    <template v-for="stripIndex in numberOfStrips" :key="stripIndex">
      <div class="led-strip-container">
        <div>
          <h3>LED-strip {{ stripIndex }}</h3>
          <div v-if="colors[stripIndex - 1]?.length > 0" class="led-strip">
            <div
              v-for="(color, index) in colors[stripIndex - 1]"
              :key="index"
              class="led"
              :style="{ backgroundColor: color }"
            ></div>
          </div>
        </div>
      </div>
    </template>

    <div>
      <label for="brightness">Helderheid: </label>
      <input type="range" id="brightness" min="0" max="255" v-model="brightness" />
    </div>

    <div>
      <label for="colorPicker">Kies een kleur:</label>
      <input type="color" id="colorPicker" v-model="selectedColor" />
    </div>

    <div>
      <label for="ledStrip">Selecteer LED-strip:</label>
      <select id="ledStrip" v-model="selectedStrip">
        <option value="0">Beide strips</option>
        <option value="1">Enkel de eerste strip</option>
        <option value="2">Enkel de tweede strip</option>
        <!-- Hier kun je extra opties toevoegen voor extra strips als dat nodig is -->
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
      numberOfStrips: 1,
      brightness: 200,
      selectedColor: '#ff0000',
      selectedStrip: 0,
      colors: [],
    };
  },
  methods: {
    fetchColors() {
      for (let i = 1; i <= this.numberOfStrips; i++) {
        axios
          .get('http://ic' + i + '.local/json/live')
          .then((response) => {
            const colorsObject = response.data.leds;
            const colors = Object.values(colorsObject).map((color) => `#${color}`);
            this.colors[i - 1] = colors;
          })
          .catch((error) => {
            console.error('Error fetching colors:', error);
          });
      }
    },
    setEffect() {
      const formData = {
        strip: this.selectedStrip,
        color: this.selectedColor,
        brightness: this.brightness,
      };

      axios
        .post('http://localhost:3000/color', formData)
        .then((response) => {})
        .catch((error) => {
          console.error(error);
        });
    },
  },
  mounted() {
    this.fetchColors();
    setInterval(this.fetchColors, 10); // Fetch colors every second
    this.$watch(
      () => [this.brightness, this.selectedColor, this.selectedStrip],
      () => {
        this.setEffect();
      }
    );
  },
};
</script>

<style>
.led-strip-container {
  margin-bottom: 20px; /* Ruimte toegevoegd tussen LED-strips */
}

.led-strip {
  display: flex;
}

.led {
  width: 35px;
  height: 15px;
  margin: 0px;
}
</style>
