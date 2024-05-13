const mysql = require("mysql2");
require("dotenv").config();
const ledstrips = require("./ledstrips");
const { Segment } = require("./VirtualLedstrip");

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

const deleteEffect = (req, res) => {
  const effectName = req.body.name;
  const query = "DELETE FROM effects WHERE name = ?";

  connection.query(query, [effectName], (err) => {
    if (err) {
      console.error("Error executing database query:", err);
      res.status(500).send(err);
      return;
    }
    res.status(200).send("Effect deleted");
  });
};

const saveEffect = (req, res) => {
  res.status(200).send("saved effect");
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

  connection.query(
    "INSERT INTO effects (name, effectData) VALUES (?, ?)",
    [effectName, JSON.stringify(serializedLedstrips)],
    (err) => {
      if (err) {
        console.error("Error saving effect:", err);
        return;
      }
      console.log("Effect saved successfully");
    }
  );
};

const loadEffect = (req, res) => {
  const name = req.body.name;
  const query = "SELECT * FROM effects WHERE name = ?";
  console.log("loading effect", name);
  connection.query(query, [name], (err, results) => {
    if (err) {
      console.error("Error executing database query:", err);
      res.status(500).send(err);
      return;
    }
    const leds = splitIntoLedStrips(JSON.parse(results[0].effectData));
    leds.forEach((strip) => {
      const deserializedStrip = strip;
      const matchingLedStrip = ledstrips.ledstrips.find(
        (strip) => strip.name === deserializedStrip.name
      );
      if (!matchingLedStrip) {
        console.log("Ledstrip not found");
        return;
      }

      console.log("loading effect", JSON.stringify(deserializedStrip, null, 2));
      console.log("matching ledstrip", matchingLedStrip);

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
