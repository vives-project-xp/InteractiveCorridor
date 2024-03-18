const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const app = express();
const port = 3000;

const colors = require("./color");
const effects = require("./effect");
const leds = require("./leds");

const swaggerUi = require("swagger-ui-express");
const fs = require("fs");
const YAML = require("yaml");
const file = fs.readFileSync("./swagger.yaml", "utf8");
const swaggerDocument = YAML.parse(file);

app.use(cors());
app.use(bodyParser.json());
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.get("/leds", leds.getLeds);

app.post("/color", colors.setColor);
app.post("/effect", effects.setEffect);

app.get("/effect", effects.getEffect);

app.get("/*", (req, res) => {
  res.redirect("/api-docs");
});
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
