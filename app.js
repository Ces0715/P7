const express = require('express');
const helmet = require('helmet');
const path = require('path');
//const auth = require("./middleware/auth");
const db = require("./middleware/dbconnect");
const app = express();

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
  next();
});
app.use(express.json());
app.use(helmet());
app.use((_req, res, next) => {
  res.setHeader("X-XSS-Protection", "1; mode=block");
  next();
});
app.use('/images', express.static(path.join(__dirname, 'images')));

const blogRoutes = require('./routes/blog');
app.use('/api/blogs', blogRoutes);

const userRoutes = require('./routes/user');
app.use('/api/users', userRoutes);

module.exports = app;


/*
app.get('/users', function (_req, res) {
  db.query('SELECT * FROM users', function (error, results, _fields) {
      if (error) throw error;
      return res.send({ data: results, message: 'user list.' });
  });
});

// Recuperation user avec id 
app.get('/users/:id', function (req, res) {
  let user_id = req.params.id;
  if (!user_id) {
   return res.status(400).send({ error: true, message: 'Please provide user_id' });
  }
  db.query('SELECT * FROM users where id=?', user_id, function (error, results, fields) {
   if (error) throw error;
    return res.send({ error: false, data: results[0], message: 'users list.' });
  });
});

// Ajout nouvel user 
app.post('/users', function (req, res) {
  let user = req.body.user;
  if (!user) {
    return res.status(400).send({ error:true, message: 'Ajouter nouvel user' });
  }
 db.query("INSERT INTO users SET ? ", { user: user }, function (error, results, fields) {
if (error) throw error;
  return res.send({ error: false, data: results, message: 'User crée.' });
  });
});

//  Modifier user avec id
app.put('/users', function (req, res) {
  let user_id = req.body.user_id;
  let user = req.body.user;
  if (!user_id || !user) {
    return res.status(400).send({ error: user, message: 'Ajouter user et user_id' });
  }
  db.query("UPDATE users SET user = ? WHERE id = ?", [user, user_id], function (error, results, fields) {
    if (error) throw error;
    return res.send({ error: false, data: results, message: 'User modifié.' });
   });
  });

  //  Supprimer user
 app.delete('/users', function (req, res) {
  let user_id = req.body.user_id;
  if (!user_id) {
      return res.status(400).send({ error: true, message: 'Supprimer user_id' });
  }
  db.query('DELETE FROM users WHERE id = ?', [user_id], function (error, results, fields) {
      if (error) throw error;
      return res.send({ error: false, data: results, message: 'User supprimé.' });
  });
  }); 










/*
// Ajout nouveau blog 
app.post('/blogs', function (req, res) {
  let blog = req.body.blog;
  if (!blog) {
    return res.status(400).send({ error:true, message: 'Ajouter nouveau blog' });
  }
 db.query("INSERT INTO blogs SET ? ", { blog: blog }, function (error, results, fields) {
if (error) throw error;
  return res.send({ error: false, data: results, message: 'blog crée.' });
  });
});

//  Modifier blog avec id
app.put('/blogs', function (req, res) {
  let blog_id = req.body.blog_id;
  let blog = req.body.blog;
  if (!blog_id || !blog) {
    return res.status(400).send({ error: user, message: 'Ajouter user et user_id' });
  }
  db.query("UPDATE blogs SET blog = ? WHERE id = ?", [blog, blog_id], function (error, results, fields) {
    if (error) throw error;
    return res.send({ error: false, data: results, message: 'Blog modifié.' });
   });
  });

  //  Supprimer blog
 app.delete('/blogs', function (req, res) {
  let blog_id = req.body.blog_id;
  if (!blog_id) {
      return res.status(400).send({ error: true, message: 'Supprimer blog_id' });
  }
  db.query('DELETE FROM blogs WHERE id = ?', [blog_id], function (error, results, fields) {
      if (error) throw error;
      return res.send({ error: false, data: results, message: 'blog supprimé.' });
  });
  }); 
 
//Recuperation tous les blogs
app.get('/blogs', function (_req, res) {
  db.query('SELECT * FROM blogs', function (error, results, _fields) {
      if (error) throw error;
      return res.send({ data: results, message: 'blog list.' });
  });
});

// Recuperation blog avec id 
app.get('/blogs/:id', function (req, res) {
  let blog_id = req.params.blog_id;
  if (!blog_id) {
   return res.status(400).send({ error: true, message: ' blog_id non recupéré' });
  }
  db.query('SELECT * FROM blogs where id=?', blog_id, function (error, results, fields) {
   if (error) throw error;
    return res.send({ error: false, data: results[0], message: 'blogs list.' });
  });
});


db.query('SELECT * FROM blogs', (err, rows) => {
  if (err) throw err;
  console.log('Données récupérées');
  console.log(rows);
});
db.query('SELECT * FROM users', (err, rows) => {
  if (err) throw err;
  console.log('Users récupérés');
  console.log(rows);
});
*/

