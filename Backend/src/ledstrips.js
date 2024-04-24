const mqtt = require("./mqtt");
const VirtualLedstrip = require("./VirtualLedstrip");

const ledstrips = [new VirtualLedstrip(0, 0)];
ledstrips.pop(); // enforce type
//ledstrips.push(new VirtualLedstrip("testLedstrip", 100, [11, 11, 11, 11]));

const searchLeds = () => {
  for (let i = 1; i <= 6; i++) {
    mqtt.publish("IC/ic" + i, '{"on": true}');
    if (
      mqtt.statusList["IC/ic" + i] == "offline" ||
      mqtt.statusList["IC/ic" + i] == undefined
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
      (mqtt.statusList["IC/" + strip.name] == "offline" ||
        mqtt.statusList["IC/" + strip.name] == undefined) &&
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
