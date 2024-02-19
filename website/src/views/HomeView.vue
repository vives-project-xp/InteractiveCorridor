<template>
  <main>
    <div>
      <label for="numberOfStrips">Aantal LED-strips:</label>
      <input type="number" id="numberOfStrips" v-model.number="numberOfStrips" />
    </div>

    <template v-for="stripIndex in numberOfStrips" :key="stripIndex">
      <div
        class="led-strip-container"
        :class="{ 'selected-strip': isSelected(stripIndex) }"
        @click="toggleStrip(stripIndex)"
      >
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
      <input type="color" id="colorPicker" v-model="selectedColor" @change="updateStripsColor" />
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
      selectedStrips: [],
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
    toggleStrip(stripIndex) {
      if (this.isSelected(stripIndex)) {
        // If strip is already selected, deselect it
        this.selectedStrips = this.selectedStrips.filter((strip) => strip !== stripIndex);
      } else {
        // Otherwise, select it
        this.selectedStrips.push(stripIndex);
      }

      // Check if the color is changed before calling setEffect
      const previousColor = this.colors[this.selectedStrips[0] - 1][0]; // Assuming all LEDs in the strip have the same color
      if (this.selectedStrips.length > 0 && previousColor !== this.selectedColor) {
        this.setEffect(); // Call setEffect method to apply changes
      }
    },

    isSelected(stripIndex) {
      return this.selectedStrips.includes(stripIndex);
    },
    updateStripsColor() {
      if (this.selectedStrips.length > 0) {
        // Update the color of selected LED strips only when the color is changed in the color picker
        this.setEffect();
      }
    },
    setEffect() {
      const formData = {
        strips: this.selectedStrips,
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
    setInterval(this.fetchColors, 10);
    this.$watch(
      () => [this.brightness, this.selectedColor, this.selectedStrips],
      () => {
        this.setEffect();
      }
    );
  },
};
</script>

<style>
.led-strip-container {
  margin-bottom: 20px;
  cursor: pointer; /* Maak de LED-strip container lijkt alsof het klikbaar is */
}

.selected-strip {
  background-color: lightblue; /* Achtergrondkleur voor geselecteerde LED-strip */
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
