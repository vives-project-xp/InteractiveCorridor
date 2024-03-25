const mqtt = require("./mqtt");
const { ledstrips } = require("./ledstrips");

const getLeds = async (req, res) => {
  console.log("Getting LEDS");
  const strips = [];

  for (const strip of ledstrips) {
    const segments = [];
    for (const segment of strip.segments) {
      console.log(segment);
      segments.push({
        start: segment.start,
        end: segment.end,
        color: segment.color,
      });
    }
    strips.push({
      index: strip.index,
      name: strip.name,
      segments,
    });
  }

  res.send(strips);
};

module.exports = { getLeds };
