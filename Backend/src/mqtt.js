const mqtt = require("mqtt");
const url = "mqtt://mqtt.devbit.be:1883";

const options = {
  // Clean session
  clean: true,
  connectTimeout: 4000,
  // Authentication
  clientId: "ICBackend_" + Math.random().toString(36),
  username: "",
  password: "",
};
const client = mqtt.connect(url, options);
client.on("connect", function () {
  console.log("Connected to mqtt server!");
});

client.on("error", (error) => {
  console.error("connection failed", error);
});
client.on("reconnect", (error) => {
  console.error("reconnect failed", error);
});

const publish = (topic, message) => {
  client.publish(topic, message, function (error) {
    if (error) {
      console.log("Error: ", error);
    }
  });
};

module.exports = {
  publish,
};
