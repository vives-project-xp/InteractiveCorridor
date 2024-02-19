const mqtt = require("mqtt");
const url = "mqtt://mqtt.devbit.be:1883";

const options = {
  // Clean session
  clean: true,
  connectTimeout: 4000,
  // Authentication
  clientId: "ICBackend",
  username: "",
  password: "",
};
const client = mqtt.connect(url, options);
client.on("connect", function () {
  console.log("Connected to mqtt server!");
});

const publish = (topic, message) => {
  client.publish(topic, message, function (error) {
    if (error) {
      console.log("Error: ", error);
    }
  });
};
