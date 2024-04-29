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
  console.log("ledstrips:")
  console.table(ledstrips.ledstrips);
  ledstrips.ledstrips.forEach((ledstrip) => {
    console.log("ledstrip: ", ledstrip.name)
    ledstrip.segments.forEach((segment) => {
      console.log("segment: ", segment.index)
      console.table(segment);
  });
  });
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

module.exports = { getEffects, saveEffect };
