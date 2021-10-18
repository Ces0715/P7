const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const multer = require('../middleware/multer-config');
const BlogCtrl = require('../controllers/blog');
const db = require("../middleware/dbconnect");
const Blog = require('../models/blog');

// Ajout nouveau blog 
router.post('/',BlogCtrl.createBlog);
router.get('/',BlogCtrl.getAllBlog);
  
  //  Modifier blog avec id
  router.put('/blogs/:id', function (req, res) {
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
   router.delete('/blogs/:id', function (req, res) {
    let blog_id = req.body.blog_id;
    if (!blog_id) {
        return res.status(400).send({ error: true, message: 'Supprimer blog_id' });
    }
    db.query('DELETE FROM blogs WHERE id = ?', [blog_id], function (error, results, fields) {
        if (error) throw error;
        return res.send({ error: false, data: results, message: 'blog supprimé.' });
    });
    }); 
   
  
  
  // Recuperation blog avec id 
  router.get('/blogs/:id', function (req, res) {
    let blog_id = req.params.blog_id;
    if (!blog_id) {
     return res.status(400).send({ error: true, message: ' blog_id non recupéré' });
    }
    db.query('SELECT * FROM blogs where id=?', blog_id, function (error, results, fields) {
     if (error) throw error;
      return res.send({ error: false, data: results[0], message: 'blogs list.' });
    });
  });

  module.exports = router;
  module.exports = Blog;








/*
router.get('/', auth, blogs.getAllBlog);
router.post('/', auth, multer, blogs.createBlog);
router.get('/:id', auth, blogs.getOneBlog);
router.put('/:id', auth, blogs.modifyOneBlog);
router.delete('/:id', auth, blogs.deleteBlog);



/*
module.exports = app => {
    const blogs = require("../controllers/blog");
    // Create a new Customer
    app.post("/blogs", blogs.createBlog);
    // Retrieve all Customers
    app.get("/blogs", blogs.getAllBlog);
    // Retrieve a single Customer with customerId
    app.get("/blogs/:blogId", blogs.getOneBlog);
    // Update a Customer with customerId
    app.put("/blogs/:blogId", blogs.modifyOneBlog);
    // Delete a Customer with customerId
    app.delete("/blogs/:blogId", blogs.deleteBlog);
    // Create a new Customer
    //app.delete("/blogs", blogs.deleteAllBlog);
};

*/
