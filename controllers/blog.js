// recuperer le modele blog
const Blog = require('../models/blog');
// recuperer modele file system pour les images
const fs = require('fs');
const db = require("../middleware/dbconnect");

exports.createBlog = (req, res) => {
  let blog = req.body.blog;
  if (!blog) {
    return res.status(400).send({ error: true, message: 'Ajouter nouveau blog' });
  }
  db.query("INSERT INTO blogs SET ? ", { blog: blog }, function (error, results, fields) {
    if (error)
      throw error;
    return res.send({ error: false, data: results, message: 'blog crée.' });
  });
}

exports.getAllBlog = (_req, res) => {
  res.send('hello');
      db.query('SELECT * FROM blogs', (error, results, _fields) => {
          if (error)
              throw error;
          return res.send({ data: results, message: 'blog list.' });
      });
  }

  exports.getOneBlog = function (req, res) {
    let blog_id = req.params.blog_id;
    if (!blog_id) {
     return res.status(400).send({ error: true, message: ' blog_id non recupéré' });
    }
    db.query('SELECT * FROM blogs where id=?', blog_id, function (error, results, fields) {
     if (error) throw error;
      return res.send({ error: false, data: results[0], message: 'blogs list.' });
    });
  }

  exports.modifyOneBlog = function (req, res) {
    let blog_id = req.body.blog_id;
    let blog = req.body.blog;
    if (!blog_id || !blog) {
      return res.status(400).send({ error: user, message: 'Ajouter user et user_id' });
    }
    db.query("UPDATE blogs SET blog = ? WHERE id = ?", [blog, blog_id], function (error, results, fields) {
      if (error) throw error;
      return res.send({ error: false, data: results, message: 'Blog modifié.' });
     });
    }

    exports.deleteBlog = function (req, res) {
      let blog_id = req.body.blog_id;
      if (!blog_id) {
          return res.status(400).send({ error: true, message: 'Supprimer blog_id' });
      }
      db.query('DELETE FROM blogs WHERE id = ?', [blog_id], function (error, results, fields) {
          if (error) throw error;
          return res.send({ error: false, data: results, message: 'blog supprimé.' });
      });
      } 

module.exports = Blog;

;
