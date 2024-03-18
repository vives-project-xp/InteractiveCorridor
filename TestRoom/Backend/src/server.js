const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const app = express();
const port = 3000;

const colors = require("./color");
const effects = require("./effect");
const leds = require("./leds");

app.use(cors());
app.use(bodyParser.json());

app.get("/api/leds", leds.getLeds);

app.post("/api/color", colors.setColor);
app.post("/api/effect", effects.setEffect);

app.get("/api/*", (req, res) => {
  res.send("Access denied");
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
