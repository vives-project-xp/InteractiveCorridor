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

app.use(
  cors({
    origin: "*",
  })
);
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
        servers: [
          {
            url: "http://localhost:3000/api",
          },
        ],
      },
      apis: ["./**/swagger.yaml"],
    }),
    {
      customCss: ".swagger-ui .topbar { display: none }",
      customSiteTitle: "Interactive Corridor API Documentation",
    }
  )
);

app.get("/api/leds", leds.getLeds);
app.post("/api/leds", leds.postLeds);

app.post("/api/color", colors.setColor);
app.post("/api/effect", effects.setEffect);
app.get("/api/effect", effects.getEffect);

app.get("/api/dbeffects", db.getEffects);
app.post("/api/dbeffects", db.addEffect);

app.get("/*", (req, res) => {
  res.redirect("/api-docs");
});
app.listen(port, () => {
  console.log(`Server listening on http://localhost/api`);
});
