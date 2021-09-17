const express = require('express');
const app = express();
//Importer helmet pour securiser express (protection application)
//const helmet = require('helmet');
// Donner acces au chemin (importer images)
const path = require('path');
//importer mysql
const mysql = require('mysql');

//DECLARATION DES ROUTES
//importer la route dédiée aux sauces
const blogRoutes = require('./routes/blog');
// Importer la route dédiée aux utilisateurs
const userRoutes = require('./routes/user');


//module 'dotenv' pour masquer les informations de connexion à la base de données à l'aide de variables d'environnement
//require("dotenv").config();

//connection à mysql
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'ces',
    password: 'Evalia0715',
    //database: 'projet7'
  });

  connection.connect(function (err) {
    if (err) throw err;
    console.log("Connecté à la base de données MySQL!");
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
//app.use(helmet());
// cross-scripting protection (helmet)
app.use((_req, res, next) => {
  res.setHeader("X-XSS-Protection", "1; mode=block");
  next();
});

 // gestion des images
app.use('/images', express.static(path.join(__dirname, 'images')));
 

  //transformation des données de la requete POST en JSON
app.use(express.json());

//app.use('/api/blog, blogRoutes');
app.use('/api/auth', userRoutes);
// Va servir les routes dédiées aux sauces
app.use('/api/blog', blogRoutes);
module.exports = app;