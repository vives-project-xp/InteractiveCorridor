const mqtt = require("./mqtt");
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
    console.log(strips, effect, delay, speed);
    let stripCount = 0;
    for (const [strip, segments] of Object.entries(strips)) {
      const segmentsArray = JSON.parse(segments);
      for (const segment of segmentsArray) {
        mqtt.publish(
          `IC/ic${strip}`,
          `{'seg':[{'id':${
            segment - 1
          },'fx':${effect},'sx':${speed}, 'ix':${intensity}, 'rev':${reverse},'mi':${mirror}}],'tb':${
            delay * stripCount
          }}`
        );
      }
      stripCount++;
    }
  }
  res.send(
    `Effect set: \nEffect: ${effect}\nStrips: ${JSON.stringify(
      strips
    )}\nDelay: ${delay}\nSpeed: ${speed}`
  );
};

module.exports = {
  setEffect,
};
