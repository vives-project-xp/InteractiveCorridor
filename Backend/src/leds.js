const { ledstrips } = require("./ledstrips");
const { hexToRgb } = require("./utils");

const getLeds = async (req, res) => {
  const strips = [];

  for (const strip of ledstrips) {
    const segments = [];
    for (const segment of strip.segments) {
      segments.push({
        start: segment.start,
        end: segment.end,
        length: segment.length,
        color: segment.getHex(),
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

const postLeds = async (req, res) => {
  const strips = req.body;
  for (const reqStrip of strips) {
    const strip = ledstrips.find((s) => s.index === reqStrip.index);

    if (!strip) continue;

    for (let i = 0; i < reqStrip.segments.length; i++) {
      const seg = strip.segments[i];
      const reqColor = hexToRgb(reqStrip.segments[i].color);
      if (reqColor !== seg.color) seg.setColor(reqColor);
      if (reqStrip.segments[i].start !== seg.start)
        seg.setStart(reqStrip.segments[i].start);
      if (reqStrip.segments[i].end !== seg.end)
        seg.setEnd(reqStrip.segments[i].end);
    }
    strip.updateColor()
  }
  return getLeds(req, res); // return the updated ledstrips
};

module.exports = { getLeds, postLeds };
