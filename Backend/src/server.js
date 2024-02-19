const express = require("express");
const app = express();
const port = 3000;

const colors = require("./color");

app.get("/", (req, res) => {
  res.send("Access denied");
});

app.get("/color", colors.setColor);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
