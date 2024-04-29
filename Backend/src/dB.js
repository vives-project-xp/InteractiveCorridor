const mysql = require("mysql2");
require("dotenv").config();
const ledstrips = require("./ledstrips");

let connection;

try {
  connection = mysql.createConnection({
    password: process.env.MYSQL_PASSWORD,
    user: process.env.MYSQL_USER,
    host: "db",
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

const saveEffect = (req, res) => {
  res.status(200).send("saved effect");
  const effectName = req.body.name || "test";

  const serializedLedstrips = ledstrips.ledstrips.map(ledstrip => ({
    name: ledstrip.name,
    segments: ledstrip.segments.map(segment => ({
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
    ledstrips = splitIntoLedStrips(results[0].effectData);
    ledstrips.forEach(strip => {
      const deserializedStrip = deserializeEffect(strip);
        console.table(deserializedStrip);  
        //const deserializedEffect = deserializeEffect(result.effectData);
        //console.table(deserializedEffect);
        //return deserializedEffect;
      });
  });


    ledstrips.ledstrips = [];



  });
}

function splitIntoLedStrips(data) {
  const ledStrips = [];
  data.forEach(item => {
    const ledStrip = {
      name: item.name,
      segments: item.segments
    };
    ledStrips.push(ledStrip);
  });
  return ledStrips;
}


const deserializeEffect = (serializedEffect) => {
  // Controleer of de serializedEffect een geldige string is
  if (typeof serializedEffect !== 'string') {
    throw new Error('Ongeldige serialized effect. Het moet een string zijn.');
  }

  try {
    const parsedEffect = JSON.parse(serializedEffect);
    const deserializedEffect = {
      name: parsedEffect.name,
      segments: parsedEffect.segments.map(segment => ({
        start: segment.start,
        end: segment.end,
        color: segment.color,
        effect: segment.effect,
      })),
    };
    return deserializedEffect;
  } catch (error) {
    throw new Error('Fout bij het deserialiseren van het effect:', error);
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

module.exports = { getEffects, saveEffect, loadEffect };
