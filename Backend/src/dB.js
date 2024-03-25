const mysql = require("mysql2");
require("dotenv").config();
let MAX_RETRIES = 10; // Aantal pogingen om verbinding te maken
let connected = false; // Variabele om de status van de verbinding bij te houden

let connection = null;

const connectWithRetry = () => {
  connection = mysql.createConnection({
    password: process.env.MYSQL_PASSWORD,
    user: process.env.MYSQL_USER,
    host: "database",
    port: 3306,
    database: process.env.MYSQL_DATABASE,
    insecureAuth: true,
  });

  connection.connect((err) => {
    console.log(
      "trying to connect with this credentials",
      process.env.MYSQL_PASSWORD,
      process.env.MYSQL_USER,
      process.env.MYSQL_DATABASE
    );
    if (err) {
      console.error("Error connecting to database:", err);
      if (MAX_RETRIES > 0) {
        console.log(`Retrying connection. Attempts left: ${MAX_RETRIES}`);
        MAX_RETRIES--;
        setTimeout(connectWithRetry, 1000); // Probeer opnieuw na 1 seconde
      } else {
        console.error("Max retries reached. Could not connect to database.");
      }
      return;
    }
    console.log("Connected to database");
    connected = true;
  });
};

connectWithRetry(); // Start de eerste poging om verbinding te maken

const getEffects = (req, res) => {
  if (!connected) {
    res.status(500).send("Not connected to database");
    return;
  }

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

const addEffect = (req, res) => {
  if (!connected) {
    res.status(500).send("Not connected to database");
    return;
  }

  const createTableQuery = `
    CREATE TABLE IF NOT EXISTS effects (
      id INT AUTO_INCREMENT PRIMARY KEY,
      name VARCHAR(255) NOT NULL,
      effectData TEXT NOT NULL
    )
  `;

  const insertEffectQuery =
    "INSERT INTO effects (name, effectData) VALUES (?, ?)";

  connection.query(createTableQuery, (err) => {
    if (err) {
      console.error("Error creating table:", err);
      res.status(500).send("Error creating table");
      return;
    }

    const effectDataString = JSON.stringify(req.body.effectData);

    connection.query(
      insertEffectQuery,
      [req.body.name, effectDataString],
      (err, results) => {
        if (err) {
          console.error("Error executing database query:", err);
          res.status(500).send(err);
          return;
        }
        res.status(200).send("Effect added successfully");
      }
    );
  });
};

module.exports = { getEffects, addEffect };
