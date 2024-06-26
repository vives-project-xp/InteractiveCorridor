const mqtt = require("./mqtt");
const { ledstrips } = require("./ledstrips");
const { hexToRgb } = require("./utils");
const db = require("./dB");
const axios = require("axios");

const segmentsLengths = [1, 2, 4, 8];

const getLeds = async (req, res) => {
  const strips = [];
  for (const strip of ledstrips) {
    const segments = [];
    for (const segment of strip.segments) {
      segments.push({
        start: segment.start,
        end: segment.end,
        length: segment.length,
        effect: segment.effect.id,
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
    //strip.updateSegments();
    strip.updateColor();
  }
  return getLeds(req, res); // return the updated ledstrips
};

const changeLeds = async (req, res) => {
  const strip = ledstrips.find((s) => s.index === req.body.strip.index);
  const currentLength = strip.segments.length;
  const totalLeds = strip.length;

  const currentIndex = segmentsLengths.indexOf(currentLength);
  let nextIndex = (currentIndex + 1) % segmentsLengths.length;
  const nextLength = segmentsLengths[nextIndex];

  strip.adjustSegments(
    Array(nextLength).fill(Math.floor(totalLeds / nextLength))
  );
  res.send("Segments changed");
};

const setDefault = async () => {
  const data = {
    name: process.env.DEFAULT_EFFECT_NAME,
  };

  await axios
    .post(
      process.env.BACKEND_URL + ":" + process.env.BACKEND_PORT + `/loadeffect`,
      data
    )
    .catch((error) => {
      console.error(error);
    });
};

module.exports = { getLeds, postLeds, changeLeds, setDefault };
