const mqtt = require("./mqtt");

const getLeds = async (req, res) => {
  const strips = [];
  const keys = Object.keys(mqtt.statusList);

  for (let i = 0; i < keys.length; i++) {
    const status = Object.values(mqtt.statusList)[i];
    if (status === "online") {
      // Extract numbers from the key using regular expression
      const number = keys[i].match(/\d+/)[0];
      strips.push(number);
    }
  }
  res.json(strips);
};

module.exports = { getLeds };
