const mysql = require('mysql');
require('dotenv').config(); 

const connection = mysql.createConnection({
  password: process.env.MYSQLDB_ROOT_PASSWORD,
  user: 'root',
  host: '127.0.0.1', 
  port: 3307,
  database: process.env.MYSQLDB_DATABASE
});

connection.connect((err) => {
  if (err) {
    console.error('Error connecting to database:', err);
    return;
  }
  console.log('Connected to database');
});

const getDatabaseData = (req,res) => {
    const query = 'SELECT * FROM settings'; 
  
    connection.query(query, (err, results) => {
      if (err) {
        console.error('Fout bij het uitvoeren van de databasequery:', err);
        res.send(err);
        return;
      }
      res.send(results);
    });
};

module.exports = { getDatabaseData };