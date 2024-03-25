const mysql = require("mysql");
require("dotenv").config();
let MAX_RETRIES = 10; // Aantal pogingen om verbinding te maken
let connected = false; // Variabele om de status van de verbinding bij te houden

const connectWithRetry = () => {
  const connection = mysql.createConnection({
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

const getDatabaseData = (req, res) => {
  if (!connected) {
    res.status(500).send("Not connected to database");
    return;
  }

  const query = "SELECT * FROM settings";

  connection.query(query, (err, results) => {
    if (err) {
      console.error("Fout bij het uitvoeren van de databasequery:", err);
      res.status(500).send(err);
      return;
    }
    res.send(results);
  });
};

module.exports = { getDatabaseData };
