const mysql = require("mysql");
const dbConfig = require("");
require("dotenv").config();

// Create a connection to the database
const db = mysql.createConnection({
  host: dbConfig.process.env.DB_HOST,
  port: dbConfig.process.env.DB_PORT,
  user: dbConfig.process.env.DB_USER,
  password: dbConfig.process.env.DB_PASS,
  database: dbConfig.process.env.DB_DATABASE
  });
  
  // open the MySQL connection
  db.connect(error => {
    if (error) throw error;
    console.log("Successfully connected to the database.");
  });
  
  module.exports = db;