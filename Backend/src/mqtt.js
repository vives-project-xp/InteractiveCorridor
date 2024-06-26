const mqtt = require("mqtt");
require("dotenv").config();

let url = process.env.MQTT_HOST + ":" + process.env.MQTT_PORT;

const baseTopic = process.env.MQTT_BASE_TOPIC;

const options = {
  clean: true, // Clean session
  connectTimeout: 4000,
  username: process.env.MQTT_USERNAME,
  password: process.env.MQTT_PASSWORD,
};

let statusList = {};

const client = mqtt.connect(url, options);

client.on("error", (err) => {
  console.error("MQTT Connection failed:", err);
});

client.on("connect", () => {
  console.log("Connected to MQTT server: " + url);
});

client.on("disconnect", () => {
  console.error("Disconnected from MQTT server:");
});

const publish = (topic, message) => {
  // Subscribe to the status topic to check message receipt
  // Publish to the specified topic
  const apiTopic = baseTopic + topic + "/api";
  client.publish(apiTopic, message, (error) => {
    if (error) {
      console.log("Error:", error);
    }
    // Assume device is offline upon message publication until proven otherwise
    //statusList[topic] = "offline";
  });
  subscribe(topic + "/status", (receivedTopic, receivedMessage) => {
    statusList[baseTopic + topic] = receivedMessage;
  });
};

const subscribe = (topic, callback) => {
  // Subscribe to the specified MQTT topic
  client.subscribe(baseTopic + topic, (error) => {
    if (error) {
      console.log("Error:", error);
    }
  });
  // Add a listener for incoming messages on the specified topic
  client.on("message", (receivedTopic, message) => {
    // Check if the received topic matches the specified topic
    if (receivedTopic === baseTopic + topic) {
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
