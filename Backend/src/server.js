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


app.get("/leds", leds.getLeds);

app.post("/color", colors.setColor);
app.post("/effect", effects.setEffect);

app.get("/*", (req, res) => {
  res.send("Access denied");
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
