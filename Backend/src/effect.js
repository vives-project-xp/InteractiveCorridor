const { response } = require("express");
const mqtt = require("./mqtt");
const { ledstrips } = require("./ledstrips");
topic = "";

//{"strips":"{1,2}", "effect":"3", "delay":1000, "speed": 200}
const setEffect = (req, res) => {
  const strips = req.body.strips;
  const effect = req.body.effect || 0;
  const delay = req.body.delay || 0;
  const speed = req.body.speed || 128;
  const intensity = req.body.intensity || 128;
  const reverse = req.body.reverse || false;
  const mirror = req.body.mirror || false;

  if (strips === undefined) {
    res.send("No strips specified");
    return;
  } else if (effect === undefined) {
    res.send(
      "No effect specified. Please specify an effect between 0 and 117 (https://github.com/Aircoookie/WLED/wiki/List-of-effects-and-palettes)"
    );
    return;
  }

  for (const strip of strips) {
    console.log(strip);
    const virtualStrip = ledstrips.find(
      (vstrip) => vstrip.index === strip.index
    );
    if (virtualStrip === undefined) {
      res.send(`Strip ${strip} not found`);
      return;
    }

    for(const segment in strip.segments){
      virtualStrip.segments[segment].setEffect({
        id: effect,
        delay,
        speed,
        intensity,
        reverse,
        mirror,
      })
    }
  }

  res.send(
    `Effect set: \nEffect: ${effect}\nStrips: ${JSON.stringify(
      strips
    )}\nDelay: ${delay}\nSpeed: ${speed}`
  );
};

const getEffect = async (req, res) => {
  const effects = await fetch(
    "https://raw.githubusercontent.com/scottrbailey/WLED-Utils/main/effect_descriptions.json"
  ).then((response) => response.json());
  res.json(effects);
};

module.exports = {
  setEffect,
  getEffect,
};
