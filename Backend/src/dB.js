const mysql = require("mysql2");
require("dotenv").config();
const ledstrips = require("./ledstrips");
const { Segment } = require("./VirtualLedstrip");
const fs = require("fs");
const path = require("path");

const predefinedEffectsPath = path.resolve(
  __dirname,
  "predefined-effects.json"
);
const predefinedEffectsExamplePath = path.resolve(
  __dirname,
  "predefined-effects-example.json"
);

function checkAndLoadPredefinedEffects() {
  return new Promise((resolve, reject) => {
    fs.access(predefinedEffectsPath, fs.constants.F_OK, (err) => {
      if (err) {
        // If the file doesn't exist, copy the predefined-effects-example.json file
        fs.copyFile(
          predefinedEffectsExamplePath,
          predefinedEffectsPath,
          (err) => {
            if (err) {
              console.error(
                "Error copying predefined-effects-example.json:",
                err
              );
              reject(err);
              return;
            }
            console.log("predefined-effects.json file created successfully");
            resolve();
          }
        );
      } else {
        resolve();
      }
    });
  });
}

let predefinedEffects = [];

async function init() {
  try {
    await checkAndLoadPredefinedEffects();
    predefinedEffects = require(predefinedEffectsPath);
    console.log("predefinedEffects loaded successfully");
  } catch (error) {
    console.error("Failed to initialize predefinedEffects:", error);
  }
}

init();

let connection;

try {
  connection = mysql.createConnection({
    password: process.env.MYSQL_PASSWORD,
    user: process.env.MYSQL_USER,
    host: "database",
    port: 3306,
    database: process.env.MYSQL_DATABASE,
    insecureAuth: true,
  });

  try {
    connection.connect((err) => {
      console.log(
        "trying to connect with this credentials",
        process.env.MYSQL_PASSWORD,
        process.env.MYSQL_USER,
        process.env.MYSQL_DATABASE
      );
    });
  } catch (err) {
    process.exit(1);
  }
} catch (err) {
  console.log(err);
  process.exit(1);
}

connection.on("error", function (err) {
  console.log("Error in database connection");
  console.log(err);
  process.exit(1);
});

connection.on("connect", function () {
  console.log("connected to database");
  createTable();
});

const getEffects = (req, res) => {
  checkPreDefinedEffects();
  const query = "SELECT * FROM effects";

  connection.query(query, (err, results) => {
    if (err) {
      console.error("Fout bij het uitvoeren van de databasequery:", err);
      res.status(500).send(err);
      return;
    }
    res.send(results);
  });
};

const checkPreDefinedEffects = () => {
  predefinedEffects.forEach((effect) => {
    const serializedEffect = JSON.stringify(effect.effectData);

    connection.query(
      "SELECT COUNT(*) AS count FROM effects WHERE name = ?",
      [effect.name],
      (err, results) => {
        if (err) {
          console.error("Error checking for existing predefined effect:", err);
          return;
        }

        if (results[0].count > 0) {
          return;
        } else {
          connection.query(
            "INSERT INTO effects (name, preDefined, effectData) VALUES (?, ?, ?)",
            [effect.name, true, serializedEffect],
            (err) => {
              if (err) {
                console.error("Error saving predefined effect:", err);
                return;
              }
            }
          );
        }
      }
    );
  });
};

const deleteEffect = (req, res) => {
  const effectName = req.body.name;
  const query = "DELETE FROM effects WHERE name = ?";

  connection.query(query, [effectName], (err) => {
    if (err) {
      console.error("Error executing database query:", err);
      res.status(500).send(err);
      return;
    }
    getEffects(req, res);
  });
};

const saveEffect = (req, res) => {
  const effectName = req.body.name || "test";

  const serializedLedstrips = ledstrips.ledstrips.map((ledstrip) => ({
    name: ledstrip.name,
    segments: ledstrip.segments.map((segment) => ({
      start: segment.start,
      end: segment.end,
      color: segment.color,
      effect: segment.effect,
    })),
  }));

  const effectData = JSON.stringify(serializedLedstrips);

  connection.query(
    "SELECT COUNT(*) AS count FROM effects WHERE name = ?",
    [effectName],
    (err, results) => {
      if (err) {
        console.error("Error checking for existing effect:", err);
        res.status(500).send("Error checking for existing effect");
        return;
      }

      if (results[0].count > 0) {
        res.status(400).send("Effect already exists");
      } else {
        connection.query(
          "INSERT INTO effects (name, preDefined, effectData) VALUES (?, ?, ?)",
          [effectName, false, effectData],
          (err) => {
            if (err) {
              console.error("Error saving effect:", err);
              res.status(500).send("Error saving effect");
              return;
            }
            res.status(200).send("Effect saved successfully");
          }
        );
      }
    }
  );
};

const loadEffect = (req, res) => {
  const name = req.body.name;
  const query = "SELECT * FROM effects WHERE name = ?";
  connection.query(query, [name], (err, results) => {
    if (err) {
      console.error("Error executing database query:", err);
      res.status(500).send(err);
      return;
    }
    if (results.length === 0) {
      console.log("Effect not found");
      return;
    }
    var leds = results[0].effectData;
    while (typeof leds != "object") {
      leds = JSON.parse(leds);
    }
    console.log(typeof leds);
    leds.forEach((strip) => {
      const deserializedStrip = strip;
      const matchingLedStrip = ledstrips.ledstrips.find(
        (strip) => strip.name === deserializedStrip.name
      );
      if (!matchingLedStrip) {
        console.log("Ledstrip not found");
        return;
      }

      matchingLedStrip.clearSegments();
      deserializedStrip.segments.forEach((segment) => {
        const newSegment = new Segment(
          matchingLedStrip,
          segment.start,
          segment.end,
          segment.color
        );
        newSegment.setEffect(segment.effect);
        matchingLedStrip.segments.push(newSegment);
      });
      matchingLedStrip.updateSegments();
      matchingLedStrip.updateEffect();
      matchingLedStrip.updateColor();
    });
  });
  res.send("Effect loaded");
};

function splitIntoLedStrips(data) {
  const ledStrips = [];
  data.forEach((item) => {
    const ledStrip = {
      name: item.name,
      segments: item.segments,
    };
    ledStrips.push(ledStrip);
  });
  return ledStrips;
}

const deserializeStrip = (serializedStrip) => {
  try {
    const deserializedStrip = {
      name: serializedStrip.name,
      segments: serializedStrip.segments.map((segment) => ({
        start: segment.start,
        end: segment.end,
        color: segment.color,
        effect: segment.effect,
      })),
    };
    return deserializedStrip;
  } catch (error) {
    throw new Error("Fout bij het deserialiseren van het effect:", error);
  }
};

const createTable = () => {
  const createTableQuery = `
    CREATE TABLE IF NOT EXISTS effects (
      id INT AUTO_INCREMENT PRIMARY KEY,
      name VARCHAR(255) NOT NULL,
      preDefined BOOLEAN NOT NULL,
      effectData TEXT NOT NULL
    )
  `;

  connection.query(createTableQuery, (err) => {
    if (err) {
      console.error("Error creating table:", err);
      return;
    }
    console.log("Table created successfully");
  });
};

module.exports = { getEffects, saveEffect, loadEffect, deleteEffect };
