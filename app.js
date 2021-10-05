const express = require('express');
const app = express();
const helmet = require('helmet');
const path = require('path');
const auth = require("./middleware/auth");
const db = require("./middleware/dbconnect");

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


app.get("/", (_req, res) => {
  res.json({ message: "API  groupomania " });
});
app.post("/", (_req, res) => {
  res.json({ message: "API  groupomania poste " });
});

app.get('/blog', function (_req, res) {
  db.query('SELECT * FROM blog', function (error, results, _fields) {
      if (error) throw error;
      return res.send({ data: results, message: 'blog list.' });
  });
});

app.get('/user', function (_req, res) {
  db.query('SELECT * FROM user', function (error, results, _fields) {
      if (error) throw error;
      return res.send({ data: results, message: 'user list.' });
  });
});

// Recuperation user avec id 
app.get('/user/:id', function (req, res) {
  let user_id = req.params.id;
  if (!user_id) {
   return res.status(400).send({ error: true, message: 'Please provide user_id' });
  }
  db.query('SELECT * FROM user where id=?', user_id, function (error, results, fields) {
   if (error) throw error;
    return res.send({ error: false, data: results[0], message: 'users list.' });
  });
});

// Ajout nouvel user 
app.post('/user', function (req, res) {
  let user = req.body.user;
  if (!user) {
    return res.status(400).send({ error:true, message: 'Ajouter nouvel user' });
  }
 db.query("INSERT INTO user SET ? ", { user: user }, function (error, results, fields) {
if (error) throw error;
  return res.send({ error: false, data: results, message: 'User crée.' });
  });
});

//  Modifier user avec id
app.put('/user', function (req, res) {
  let user_id = req.body.user_id;
  let user = req.body.user;
  if (!user_id || !user) {
    return res.status(400).send({ error: user, message: 'Ajouter user et user_id' });
  }
  db.query("UPDATE user SET user = ? WHERE id = ?", [user, user_id], function (error, results, fields) {
    if (error) throw error;
    return res.send({ error: false, data: results, message: 'User modifié.' });
   });
  });

  //  Supprimer user
 app.delete('/user', function (req, res) {
  let user_id = req.body.user_id;
  if (!user_id) {
      return res.status(400).send({ error: true, message: 'Supprimer user_id' });
  }
  dbConn.query('DELETE FROM user WHERE id = ?', [user_id], function (error, results, fields) {
      if (error) throw error;
      return res.send({ error: false, data: results, message: 'User supprimé.' });
  });
  }); 

  module.exports = app;

/*
//DECLARATION DES ROUTES
//importer la route dédiée aux blog
const blogRoutes = require('./routes/blog');
// Importer la route dédiée aux utilisateurs
const userRoutes = require('./routes/user');
// Va servir les routes dédiées au user
app.use('/api/user', auth, userRoutes);
// Va servir les routes dédiées au blog
app.use('/api/blog', auth, blogRoutes);



//importer mysql pour utiliser la base de données
const mysql = require('mysql');
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
*/






