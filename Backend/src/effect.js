const { response } = require("express");
const { ledstrips } = require("./ledstrips");
topic = "";

//{"strips":"{1,2}", "effect":"3", "delay":1000, "speed": 200}
const setEffect = (req, res) => {
  const strips = req.body.strips;
  const effect = req.body.effect;
  const delay = req.body.delay;
  const speed = req.body.speed;
  const intensity = req.body.intensity;
  const reverse = req.body.reverse;
  const mirror = req.body.mirror;

  if (strips === undefined) {
    res.send("No strips specified");
    return;
  }

  for (const reqStrip of Object.values(strips)) {
    const virtualStrip = ledstrips.find(
      (vstrip) => vstrip.index === reqStrip.index
    );
    if (virtualStrip === undefined) {
      res.send(`Strip ${reqStrip.index} not found`);
      return;
    }

    for (const segment of reqStrip.segments) {
      const targetSegment = virtualStrip.segments[segment];
      if (!targetSegment) {
        console.log(`Segment ${segment} not found for strip ${reqStrip.index}`);
        continue; // Move to the next segment
      }

      targetSegment.setEffect({
        id: effect,
        delay,
        speed,
        intensity,
        reverse,
        mirror,
      });
    }
    virtualStrip.updateSegments();
    virtualStrip.updateEffect();
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
