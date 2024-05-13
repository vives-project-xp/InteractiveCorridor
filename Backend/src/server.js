const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const app = express();
const port = 3000;

const db = require("./dB");
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
            url: process.env.BACKEND_URL + ":" + process.env.BACKEND_PORT,
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

let lastRequestTime = Date.now();
const TIMER_INTERVAL = process.env.TIMEOUT_TIME * 60 * 1000;
const executeTask = () => {
  leds.setDefault();
};

const startTimer = () => {
  setTimeout(() => {
    const currentTime = Date.now();
    // Controleer of er gedurende de timerinterval geen verzoeken zijn ontvangen
    if (currentTime - lastRequestTime >= TIMER_INTERVAL) {
      executeTask();
    }
    // Herstart de timer
    startTimer();
  }, TIMER_INTERVAL);
};
startTimer();

app.use((req, res, next) => {
  if (!(req.method === "GET" && req.path === "/leds")) {
    lastRequestTime = Date.now();
  }
  next();
});

app.get("/leds", leds.getLeds);
app.post("/leds", leds.postLeds);
app.post("/changeled", leds.changeLeds);

app.post("/effects", effects.setEffect);
app.get("/effects", effects.getEffect);

app.get("/db/effects", db.getEffects);
app.post("/saveeffect", db.saveEffect);
app.post("/loadeffect", db.loadEffect);
app.delete("/deleteeffect", db.deleteEffect);

app.get("/*", (req, res) => {
  res.redirect("/api-docs");
});
app.listen(port, () => {
  console.log(`Backend started`);
});
