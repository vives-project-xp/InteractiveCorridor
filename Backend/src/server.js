const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const app = express();
const port = 3000;

const db = require("./dB");
const colors = require("./color");
const effects = require("./effect");
const leds = require("./leds");

const swaggerUi = require("swagger-ui-express");
const swaggerJSdoc = require("swagger-jsdoc");

app.use(cors());
app.use(bodyParser.json());
app.use(
  "/api-docs",
  swaggerUi.serve,
  swaggerUi.setup(
    swaggerJSdoc({
      definition: {
        openapi: "3.1.0",
        info: {
          title: "Interactive Corridor API",
          version: process.env.npm_package_version || "0.0.0",
        },
      },
      apis: ["./**/swagger.yaml"],
    }),
    {
      customCss: ".swagger-ui .topbar { display: none }",
      customSiteTitle: "Interactive Corridor API Documentation",
    }
  )
);

app.get("/leds", leds.getLeds);

app.post("/color", colors.setColor);
app.post("/effect", effects.setEffect);
app.get("/data", db.getDatabaseData);

app.get("/effect", effects.getEffect);

app.get("/*", (req, res) => {
  res.redirect("/api-docs");
});
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
