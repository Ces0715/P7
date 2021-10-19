const express = require('express');
const router = express.Router();
const BlogCtrl = require('../controllers/blog');
//const auth = require('../middleware/auth');
//const multer = require('../middleware/multer-config');
//const db = require("../middleware/dbconnect");
//const Blog = require('../models/blog');

// Ajout nouveau blog 
router.post('/blogs',BlogCtrl.createBlog);
router.get('/blogs',BlogCtrl.getAllBlog);
router.get('/blogs/:id', BlogCtrl.getOneBlog);
router.put('/blogs/:id', BlogCtrl.modifyOneBlog);
router.delete('/blogs/:id', BlogCtrl.deleteBlog);

module.exports= router;

/*
router.get('/', auth, blogs.getAllBlog);
router.post('/', auth, multer, blogs.createBlog);
router.get('/:id', auth, blogs.getOneBlog);
router.put('/:id', auth, blogs.modifyOneBlog);
router.delete('/:id', auth, blogs.deleteBlog);
 */ 
  
