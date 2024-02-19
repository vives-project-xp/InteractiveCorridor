const setColor = (req, res) => {
  strip = req.query.strip;
  color = req.query.color;
  if (strip == undefined) {
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
  res.send("Color set: " + color + " on strip " + strip);
};

module.exports = {
  setColor,
};
