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

let lastRequestTime = Date.now();
const TIMER_INTERVAL = 1 * 60 * 1000; // 5 minuten
const executeTask = () => {
  // Voer hier je taak uit die je wilt uitvoeren na 5 minuten inactiviteit
  leds.white();
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
  if (req.method !== "GET" || req.path !== "/api/leds") {
    lastRequestTime = Date.now();
  }
  next();
});

app.get("/api/leds", leds.getLeds);
app.post("/api/leds", leds.postLeds);
app.post("/api/changeled", leds.changeLeds);

app.post("/api/effects", effects.setEffect);
app.get("/api/effects", effects.getEffect);

app.get("/api/db/effects", db.getEffects);
app.post("/api/saveeffect", db.saveEffect);
app.post("/api/loadeffect", db.loadEffect);
app.delete("/api/deleteeffect", db.deleteEffect);


app.get("/*", (req, res) => {
  res.redirect("/api-docs");
});
app.listen(port, () => {
  console.log(`Server listening on http://localhost/api`);
});
