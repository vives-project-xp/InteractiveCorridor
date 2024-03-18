const mqtt = require("./mqtt");

const getLeds = async (req, res) => {
  console.log("Getting LEDS");
  const strips = [];
  const keys = Object.keys(mqtt.statusList);
  const response = [];

  for (let i = 0; i < keys.length; i++) {
    const status = Object.values(mqtt.statusList)[i];
    if (status === "online") {
      // Extract numbers from the key using regular expression
      const number = keys[i].match(/\d+/)[0];
      const segments = [11, 11, 11, 11];

      strips.push({ index: number, segments });
    }
  }
  res.send(strips);
};

module.exports = { getLeds };
