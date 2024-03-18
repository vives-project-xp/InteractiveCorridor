const mqtt = require("./mqtt");

topic = "";

const setColor = (req, res) => {
  console.log(req.body);
  strips = req.body.strips;
  color = req.body.color;
  brightness = req.body.brightness;
  if (strips == undefined) {
    res.send(
      "No strip specified. Please specify a strip number between 0 and 2 (0 = all, 1 = strip 1 , 2 = strip 2, ...)"
    );
    return;
  }
  if (color == undefined) {
    res.send(
      "No color specified. Please specify a color in hex format (e.g. #FF0000 for red)"
    );
    return;
  }
  if (color[0] != "#") {
    res.send(
      "Invalid color format. Please specify a color in hex format (e.g. #FF0000 for red)"
    );
    return;
  }
  color = hexToRgb(color);

  if (brightness == undefined) {
    res.send(
      "No brightness specified. Please specify a brightness between 0 and 255"
    );
  }
  res.send(
    "Color set: \nColor: " +
      color +
      "\nStrip: " +
      strips +
      "\nBrightness: " +
      brightness
  );
  for (i = 0; i < strips.length; i++) {
    setTopic(strips[i]);
    mqtt.publish(topic, `{'seg':[{'col':[[${color}]]}],'bri':${brightness}`);
  }
};

const setTopic = (strip) => {
  if (strip == 0) {
    topic = "IC/all";
  } else {
    topic = "IC/ic" + strip;
  }
};

const hexToRgb = (hex) => {
  const rgb = [];
  rgb[0] = parseInt(hex.slice(1, 3), 16);
  rgb[1] = parseInt(hex.slice(3, 5), 16);
  rgb[2] = parseInt(hex.slice(5, 7), 16);
  return rgb;
};

module.exports = {
  setColor,
};
