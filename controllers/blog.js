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

exports.findOneBlog = (req, res) => {
  Blog.findById(req.params.id, (err, data) => {
    if (err) {
      if (err.kind === "non trouvé") {c
        res.status(404).send({
          message: `Non trouvé avec id ${req.params.id}.`
        });
      } else {
        res.status(500).send({
          message: "Erreur " + req.params.id
        });
      }
    } else res.send(data);
  });
};

exports.updateBlog = (req, res) => {
  if (!req.body) {
    res.status(400).send({
      message: "modifier!"
    });
  }
console.log(req.body);

  Blog.updateById (
    req.params.id,
    new Blog(req.body),
    (err, data) => {
      if (err) {
        if (err.kind === "non trouvé") {
          res.status(404).send({
            message: `Non trouvé avec id selectionné ${req.params.id}.`
          });
        } else {
          res.status(500).send({
            message: "Erreur " + req.params.id
          });
        }
      } else res.send(data);
    }
  );
};

exports.createBlog = (req, res) => {
  // Validate request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  } else {

    // Create a Customer
  const blog = new Blog({
    //blog_id = req.body.blog_id,
    bloguser_id : req.body.bloguser_id,
    blog_titre : req.body.titre,
    blog_text : req.body.text,
    blog_date : req.body.date,
    blog_image : req.body.image, 
  });
  console.log(blog);

    // Save Customer in the database
  Blog.createBlog(blog, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Erreur dans la création d'un blog."
      });
    else res.status(201).send({
      message: "blog cree!",
      blog:data,
    });
  });
  }
};

exports.delete = (req, res) => {
  Blog.remove (req.params.id, (err, data) => {
    if (err) {
      if (err.kind === "non trouvé") {
        res.status(404).send({
          message: `Non trouvé avec id ${req.params.id}.`
        });
      } else {
        res.status(500).send({
          message: "impossible de supprimer " + req.params.id
        });
      }
    } else res.send({ message: `Blog was deleted successfully!` });
  });
};

exports.deleteAll = (req, res) => {
  Blog.removeAll((err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all blogs."
      });
    else res.send({ message: `All blogs were deleted successfully!` });
  });
};




/*
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

*/



