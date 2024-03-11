const mqtt = require("./mqtt");
const totalStrips = 2;
topic = "";

const setEffect = (req, res) => {
  console.log(req.body);
  const strips = req.body.strips;
  const effect = req.body.effect;
  const delay = req.body.delay || 0;
  const speed = req.body.speed || 128;
  if (strips == undefined) {
    res.send(
      "No strip specified. Please specify a strip number between 0 and 2 (0 = all, 1 = strip 1 , 2 = strip 2, ...)"
    );
    return;
  } else {
    setTopic(strips);
  }

  if (effect == undefined) {
    res.send(
      "No effect specified. Please specify an effect between 0 and 117 (https://github.com/Aircoookie/WLED/wiki/List-of-effects-and-palettes)"
    );
    return;
  }

  res.send(
    "Effect set: \nEffect: " +
      effect +
      "\nStrip: " +
      strips +
      "\nDelay: " +
      delay +
      "\nSpeed: " +
      speed
  );
  //command = `{'seg':[{'fx':${effect}'sx':${speed}}],'tb':${i * delay}}`;
  if (delay > 0 && strips == 0) {
    for (i = 0; i < totalStrips; i++) {
      mqtt.publish(
        `IC/ic${i + 1}/api`,
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
    topic = "IC/all/api";
  } else {
    topic = "IC/ic" + strip + "/api";
  }
};

module.exports = {
  setEffect,
};
