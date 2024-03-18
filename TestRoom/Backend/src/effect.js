const mqtt = require("./mqtt");
topic = "";

//{"strips":"{1,2}", "effect":"3", "delay":1000, "speed": 200}
const setEffect = (req, res) => {
  console.log(req.body);
  const strips = req.body.strips;
  const effect = req.body.effect;
  const delay = req.body.delay || 0;
  const speed = req.body.speed || 128;

  if (strips == undefined) {
    res.send("No strip specified");
    return;
  } else if (effect == undefined) {
    res.send(
      "No effect specified. Please specify an effect between 0 and 117 (https://github.com/Aircoookie/WLED/wiki/List-of-effects-and-palettes)"
    );
    return;
  } else {
    console.log(strips, effect, delay, speed);
    //command = `{'seg':[{'fx':${effect}'sx':${speed}}],'tb':${i * delay}}`;
    for (const strip of strips) {
      mqtt.publish(
        `IC/ic${strip}`,
        `{'seg':[{'fx':${effect},'sx':${speed}}],'tb':${strip * delay}}`
      );
    }
  }
  res.send(
    "Effect set: \nEffect: " + effect + "\nStrip: " + strips,
    "\nDelay: " + delay,
    "\nSpeed: " + speed
  );
};

module.exports = {
  setEffect,
};
