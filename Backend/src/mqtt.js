const mqtt = require("mqtt");
const url = "mqtt://mqtt.devbit.be:1883";

const options = {
  clean: true, // Clean session
  connectTimeout: 4000,
  clientId: "ICBackend_" + Math.random().toString(36),
  username: "",
  password: "",
};

let statusList = {};

const client = mqtt.connect(url, options);

client.on("error", (error) => {
  console.error("Connection failed:", error);
});

client.on("reconnect", (error) => {
  console.error("Reconnect failed:", error);
});

const publish = (topic, message) => {
  // Subscribe to the status topic to check message receipt
  subscribe(topic + "/status", (receivedTopic, receivedMessage) => {
    statusList[topic] = receivedMessage;
  });
  // Publish to the specified topic
  const apiTopic = topic + "/api";
  client.publish(apiTopic, message, (error) => {
    if (error) {
      console.log("Error:", error);
    }
    // Assume device is offline upon message publication until proven otherwise
    statusList[topic] = "offline";
  });
};

const subscribe = (topic, callback) => {
  // Subscribe to the specified MQTT topic
  client.subscribe(topic, (error) => {
    if (error) {
      console.log("Error:", error);
    }
  });

  // Add a listener for incoming messages on the specified topic
  client.on("message", (receivedTopic, message) => {
    // Check if the received topic matches the specified topic
    if (receivedTopic === topic) {
      // Call the specified callback function with the received message
      callback(receivedTopic, message.toString());
    }
  });
};

module.exports = {
  client,
  publish,
  subscribe,
  statusList,
};
