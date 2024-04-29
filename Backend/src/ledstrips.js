const mqtt = require("./mqtt");
const { VirtualLedstrip } = require("./VirtualLedstrip");
require("dotenv").config();

const startTime = process.env.START_TIME || 8;
const endTime = process.env.END_TIME || 22;
const utcDiff = parseInt(process.env.UTC_DIFF) || 1;
const baseTopic = process.env.MQTT_BASE_TOPIC;

const ledstrips = [new VirtualLedstrip(0, 0)];
ledstrips.pop(); // enforce type
//ledstrips.push(new VirtualLedstrip("testLedstrip", 100, [11, 11, 11, 11]));

const searchLeds = () => {
  for (let i = 1; i <= 6; i++) {
    const currentTime = new Date().getUTCHours();
    const action =
      currentTime + utcDiff < startTime || currentTime + utcDiff >= endTime
        ? "false"
        : "true";
    mqtt.publish(`ic${i}`, `{"on": ${action}}`);
    if (
      mqtt.statusList[baseTopic + "ic" + i] == "offline" ||
      mqtt.statusList[baseTopic + "ic" + i] == undefined
    ) {
      continue;
    }
    if (ledstrips.find((strip) => strip.index === i)) {
      continue;
    }
    ledstrips.push(new VirtualLedstrip("ic" + i, i, [10, 10, 10, 10]));
  }

  ledstrips.sort((a, b) => a.index - b.index);

  // Remove ledstrips that are offline
  ledstrips.forEach((strip, index) => {
    if (
      (mqtt.statusList[baseTopic + strip.name] == "offline" ||
        mqtt.statusList[baseTopic + strip.name] == undefined) &&
      strip.name.toLocaleLowerCase().includes("ic")
    ) {
      ledstrips.splice(index, 1);
    }
  });
};

mqtt.client.on("connect", () => {
  searchLeds();
  setInterval(searchLeds, 1000);
});

module.exports = { ledstrips };
