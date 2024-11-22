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
        bgColor: segment.getBGHex(),
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

      const reqColor =
        typeof reqStrip.segments[i].color === "string"
          ? hexToRgb(reqStrip.segments[i].color)
          : reqStrip.segments[i].color;

      const reqBGColor =
        typeof reqStrip.segments[i].bgColor === "string"
          ? hexToRgb(reqStrip.segments[i].bgColor)
          : reqStrip.segments[i].bgColor;

      if (
        reqColor &&
        (reqColor.r !== seg.color.r ||
          reqColor.g !== seg.color.g ||
          reqColor.b !== seg.color.b)
      ) {
        seg.setColor(reqColor);
      }

      if (
        reqBGColor &&
        (reqBGColor.r !== seg.bgColor.r ||
          reqBGColor.g !== seg.bgColor.g ||
          reqBGColor.b !== seg.bgColor.b)
      ) {
        seg.setBgColor(reqBGColor);
      }

      if (reqStrip.segments[i].start !== seg.start)
        seg.setStart(reqStrip.segments[i].start);

      if (reqStrip.segments[i].end !== seg.end)
        seg.setEnd(reqStrip.segments[i].end);
    }

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
