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
  } else {
    let stripCount = 0;
    for (const [stripIndex, strip] of Object.entries(strips)) {
      console.log(stripIndex, strip);
      for (const segment of strip.segments) {
        mqtt.publish(
          `IC/ic${stripIndex}`,
          `{'seg':[{'id':${segment},'fx':${effect},'sx':${speed}, 'ix':${intensity}, 'rev':${reverse},'mi':${mirror}}],'tb':${
            delay * stripCount
          }}`
        );
      }
      stripCount++;
    }
  }

  for (const [strip, segmentsStr] of Object.entries(strips)) {
    const virtualStrip = ledstrips.find(
      (vstrip) => vstrip.index === Number(strip)
    );
    if (virtualStrip === undefined) {
      res.send(`Strip ${strip} not found`);
      return;
    }

    const segments = JSON.parse(segmentsStr);
    for (const segment of segments) {
      const targetSegment = virtualStrip.segments[segment];
      if (!targetSegment) {
        console.log(`Segment ${segment} not found for strip ${strip}`);
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
