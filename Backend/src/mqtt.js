const mqtt = require("mqtt");
require("dotenv").config();

let url;
if (process.env.MQTT_CONTAINER === "false") {
  url = process.env.MQTT_HOST + ":" + process.env.MQTT_PORT;
} else {
  url = "mqtt://mosquitto";
}

const options = {
  clean: true, // Clean session
  connectTimeout: 4000,
  clientId: "ICBackend_" + Math.random().toString(36),
  username: "",
  password: "",
};

let statusList = {};

const client = mqtt.connect(url, options);

client.on("error", (err) => {
  console.error("Connection failed:", err);
});

client.on("connect", () => {
  console.log("Connected to MQTT server: " + url);
});

client.on("disconnect", () => {
  console.error("Disconnected from MQTT server:");
});

client.on("reconnect", () => {
  console.error("Reconnect failed:");
});

const publish = (topic, message) => {
  // Subscribe to the status topic to check message receipt

  // Publish to the specified topic
  const apiTopic = topic + "/api";
  client.publish(apiTopic, message, (error) => {
    if (error) {
      console.log("Error:", error);
    }
    // Assume device is offline upon message publication until proven otherwise
    //statusList[topic] = "offline";
  });
  subscribe(topic + "/status", (receivedTopic, receivedMessage) => {
    statusList[topic] = receivedMessage;
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
