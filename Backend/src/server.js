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
let TIMER_INTERVAL = process.env.TIMEOUT_TIME;
let default_effect = false;
const executeTask = () => {
  if (!default_effect) {
    leds.setDefault();
    default_effect = true;
  }
};

const startTimer = () => {
  if (TIMER_INTERVAL === 0) {
    startTimer();
    return;
  }
  setTimeout(() => {
    const currentTime = Date.now();
    // Controleer of er gedurende de timerinterval geen verzoeken zijn ontvangen
    if (currentTime - lastRequestTime >= TIMER_INTERVAL * 60 * 1000) {
      executeTask();
    }
    // Herstart de timer
    startTimer();
  }, TIMER_INTERVAL * 60 * 1000);
};
startTimer();

const setTimeoutTime = (req, res) => {
  TIMER_INTERVAL = req.body.time;
};

const getTimeoutTime = (req, res) => {
  res.send({ time: TIMER_INTERVAL });
};

app.use((req, res, next) => {
  if (!(req.method === "GET" && req.path === "/leds")) {
    lastRequestTime = Date.now();
    default_effect = false;
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

app.post("/timeout", setTimeoutTime);
app.get("/timeout", getTimeoutTime);

app.get("/*", (req, res) => {
  res.redirect("/api-docs");
});
app.listen(port, () => {
  console.log(`Backend started`);
});
