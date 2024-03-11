const mqtt = require("./mqtt");
const totalStrips = 2;
topic = "";

const setEffect = (req, res) => {
  strip = req.query.strip;
  effect = req.query.effect;
  delay = req.query.delay;
  speed = req.query.speed;
  if (strip == undefined) {
    res.send(
      "No strip specified. Please specify a strip number between 0 and 2 (0 = all, 1 = strip 1 , 2 = strip 2, ...)"
    );
    return;
  } else {
    setTopic(strip);
  }

  if (effect == undefined) {
    res.send(
      "No effect specified. Please specify an effect between 0 and 117 (https://github.com/Aircoookie/WLED/wiki/List-of-effects-and-palettes)"
    );
    return;
  }

  if (delay == undefined) {
    delay = 0;
  }

  if (speed == undefined) {
    speed = 128;
  }

  res.send(
    "Effect set: \nEffect: " +
      effect +
      "\nStrip: " +
      strip +
      "\nDelay: " +
      delay +
      "\nSpeed: " +
      speed
  );
  //command = `{'seg':[{'fx':${effect}'sx':${speed}}],'tb':${i * delay}}`;
  if (delay > 0 && strip == 0) {
    for (i = 0; i < totalStrips; i++) {
      mqtt.publish(
        `IC/ic${i + 1}`,
        `{'seg':[{'fx':${effect},'sx':${speed}}],'tb':${i * delay}}`
      );
    }
  } else {
    mqtt.publish(
      topic,
      `{'seg':[{'fx':${effect},'sx':${speed}}],'tb':${delay}}`
    );
  }
};
const setTopic = (strip) => {
  if (strip == 0) {
    topic = "IC/all";
  } else {
    topic = "IC/ic" + strip;
  }
};

module.exports = {
  setEffect,
};
