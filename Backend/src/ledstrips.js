const mqtt = require("./mqtt");
const { VirtualLedstrip } = require("./VirtualLedstrip");
require("dotenv").config();

const startTimeH = parseInt(process.env.START_TIME.split(":")[0]) || 8;
const endTimeH = parseInt(process.env.END_TIME.split(":")[0]) || 22;
const startTimeM = parseInt(process.env.START_TIME.split(":")[1]) || 0;
const endTimeM = parseInt(process.env.END_TIME.split(":")[1]) || 0;
const utcDiff = parseInt(process.env.UTC_DIFF) || 1;
const baseTopic = process.env.MQTT_BASE_TOPIC;

const ledstrips = [new VirtualLedstrip(0, 0)];
ledstrips.pop(); // enforce type
//ledstrips.push(new VirtualLedstrip("testLedstrip", 100, [11, 11, 11, 11]));

const searchLeds = () => {
  for (let i = 1; i <= 6; i++) {
    const currentTimeH = new Date().getUTCHours() + utcDiff;
    const currentTimeM = new Date().getUTCMinutes();
    const currentTime = currentTimeH * 60 + currentTimeM;
    const startTime = startTimeH * 60 + startTimeM;
    const endTime = endTimeH * 60 + endTimeM;

    const action =
      currentTime < startTime || currentTime >= endTime ? "false" : "true";
    mqtt.publish(`ic${i}`, `{"on": ${action}}`);
    console.log(action);
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
