// recuperer le modele blog
'use strict';
const Blog = require('../models/blog');
// recuperer modele file system pour les images
//const fs = require('fs');
const db = require("../middleware/dbconnect");

exports.getAllBlog = function (_req, res,next) {
  Blog.getAll((err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Erreur pour trouver les blogs."
      });
    else res.send(data);
  });

}

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
 
exports.getOneBlog = function (req, res) {
  let blog_id = req.params.blog_id;
  if (!blog_id) {
    return res.status(400).send({ error: true, message: ' blog_id non recupéré' });
  }
  db.query('SELECT * FROM blogs where blog_id=?', blog_id, function (error, results, fields) {
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
  db.query("UPDATE blogs SET blog = ? WHERE blog_id = ?", [blog, blog_id], function (error, results, fields) {
    if (error) throw error;
    return res.send({ error: false, data: results, message: 'Blog modifié.' });
  });
}
 
exports.deleteBlog = function (req, res) {
  let blog_id = req.body.blog_id;
  if (!blog_id) {
    return res.status(400).send({ error: true, message: 'Supprimer blog_id' });
  }
  db.query('DELETE FROM blogs WHERE blog_id = ?', [blog_id], function (error, results, fields) {
    if (error) throw error;
    return res.send({ error: false, data: results, message: 'blog supprimé.' });
  });
}

//module.exports = Blog;
;

/*


exports.getAllBlog = (_req, res) => {
  Blog.getAllBlog((err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving customers."
      });
    else res.send(data);
  });
}
exports.create = (req, res) => {
  // Validate request
  if (!req.body) {
    res.status(400).send({
      message: "Remplir blog!"
    });
  }

  // Enregistrer blog dans db
  Blog.create(blog, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Erreur pour créer blog."
      });
    else res.send(data);
  });
};

exports.findAll = (_req, res) => {
  Blog.getAllBlog((err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Erreur pour récuperer les blogs."
      });
    else res.send(data);
  });
};

exports.findOne = (req, res) => {
  Blog.getOneBlog(req.params.blog_id, (err, data) => {
    if (err) {
      if (err.kind === "non trouvé") {
        res.status(404).send({
          message: `Non trouvé avec id ${req.params.blog_id}.`
        });
      } else {
        res.status(500).send({
          message: "Erreur " + req.params.blog_id
        });
      }
    } else res.send(data);
  });
};

exports.update = (req, res) => {
  if (!req.body) {
    res.status(400).send({
      message: "modifier!"
    });
  }

  Blog.modifyOneBlog (
    req.params.blogId,new Blog(req.body),
    (err, data) => {
      if (err) {
        if (err.kind === "non trouvé") {
          res.status(404).send({
            message: `Non trouvé avec id ${req.params.blogId}.`
          });
        } else {
          res.status(500).send({
            message: "Erreur " + req.params.blogId
          });
        }
      } else res.send(data);
    }
  );
};

exports.delete = (req, res) => {
  Blog.deleteBlog (req.params.blogId, (err, data) => {
    if (err) {
      if (err.kind === "non trouvé") {
        res.status(404).send({
          message: `Non trouvé avec id ${req.params.blogId}.`
        });
      } else {
        res.status(500).send({
          message: "impossible de supprimer " + req.params.blogId
        });
      }
    } else res.send({ message: `Blog was deleted successfully!` });
  });
};
*/