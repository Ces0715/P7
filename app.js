//ajout express
const express = require('express');
const app = express();
//module 'dotenv' pour masquer les informations de connexion à la base de données à l'aide de variables d'environnement
require("dotenv").config();
//importer mysql pour utiliser la base de données
const mysql = require('mysql');
//Importer helmet pour securiser express (protection application)
const helmet = require('helmet');
// Donner acces au chemin (importer images)
const path = require('path');

//DECLARATION DES ROUTES
//importer la route dédiée aux blog
const blogRoutes = require('./routes/blog');
// Importer la route dédiée aux utilisateurs
const userRoutes = require('./routes/user');

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
  db.query('SELECT * FROM blog', (err, rows) => {
    if (err) throw err;
    console.log('Données récupérées');
    console.log(rows);
  });
  db.query('SELECT * FROM user', (err, rows) => {
    if (err) throw err;
    console.log('Users récupérés');
    console.log(rows);
  });
});

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
  next();
});

//transformation des données de la requete POST en JSON
app.use(express.json());
// secure HTTP headers
app.use(helmet());
// cross-scripting protection (helmet)
app.use((_req, res, next) => {
  res.setHeader("X-XSS-Protection", "1; mode=block");
  next();
});
// gestion des images
app.use('/images', express.static(path.join(__dirname, 'images')));

// Va servir les routes dédiées au user
app.use('/api/user', userRoutes);
// Va servir les routes dédiées au blog
app.use('/api/blog', blogRoutes);

module.exports = app;
