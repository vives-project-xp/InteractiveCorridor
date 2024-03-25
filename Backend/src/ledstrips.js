const mqtt = require("./mqtt");
const VirtualLedstrip = require("./VirtualLedstrip");

const ledstrips = [new VirtualLedstrip(0, 0)];
ledstrips.pop(); // enforce type

const searchLeds = () => {
  ledstrips.length = 0;
  for (let i = 1; i <= 6; i++) {
    if (
      mqtt.statusList["IC/ic" + i] == "offline" ||
      mqtt.statusList["IC/ic" + i] == undefined
    ) {
      ledstrips.push(new VirtualLedstrip("ic" + i, i, [11, 11, 11, 11]));
    }
  }
};

mqtt.client.on("connect", () => {
  console.log("Connected to MQTT server!");
  searchLeds();
  setInterval(searchLeds, 10000);
});

module.exports = { ledstrips };
