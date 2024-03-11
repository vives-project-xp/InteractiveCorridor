<template>
  <div>
    <input type="text" v-model="url" />
    <button @click="fetchData">Fetch Data</button>
    <div v-if="loading">Loading...</div>
    <div v-else-if="error">Error: {{ error }}</div>
    <div v-else>
      <h2>Response:</h2>
      <pre>{{ response }}</pre>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      loading: false,
      error: null,
      response: null,
      url: 'http://localhost:3000/leds',
    };
  },
  methods: {
    fetchData() {
      this.loading = true;
      this.error = null;
      this.response = null;

      // Make API request here
      fetch(this.url)
        .then((response) => {
          if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
          }
          return response.text(); // Return response text
        })
        .then((data) => {
          this.loading = false;
          this.response = data; // Set response directly without JSON parsing
        })
        .catch((error) => {
          this.loading = false;
          this.error = error.message;
        });
    },
  },
};
</script>
