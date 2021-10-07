//importer mysql pour utiliser la base de données
const mysql = require('mysql');
require("dotenv").config();

//connection à mysql
const db = mysql.createConnection({
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_DATABASE
});

db.connect(function (err) {
    if (err) throw err;
    console.log("Connecté à la base de données MySQL!");   
  });
  
module.exports = db;
