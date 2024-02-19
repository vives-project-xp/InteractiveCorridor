const express = require("express");
const cors = require("cors");
const app = express();
const port = 3000;

const colors = require("./color");
const effects = require("./effect");

app.use(cors());

app.get("/", (req, res) => {
  res.send("Access denied");
});

app.get("/color", colors.setColor);
app.get("/effect", effects.setEffect);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
