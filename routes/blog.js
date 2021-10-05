const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const multer = require('../middleware/multer-config');
const blogCtrl = require('../controllers/blog');


const {
    createBlog,
    modifyOneBlog,
    deleteBlog,
    getOneBlog,
    getAllBlog,
  } = require('../controllers/blog');
router.get('/', auth, blogCtrl.getAllBlog);
router.post('/', auth, multer, blogCtrl.createBlog);
router.get('/:id', auth, blogCtrl.getOneBlog);
router.put('/:id', auth, blogCtrl.modifyOneBlog);
router.delete('/:id', auth, blogCtrl.deleteBlog);

module.exports = router;

/*
module.exports = app => {
    const blog = require("../controllers/blog");
    // Create a new Customer
    app.post("/blog", blog.createBlog);
    // Retrieve all Customers
    app.get("/blog", blog.findAllBlog);
    // Retrieve a single Customer with customerId
    app.get("/blog/:blogId", blog.findOneBlog);
    // Update a Customer with customerId
    app.put("/blog/:blogId", blog.modifyOneBlog);
    // Delete a Customer with customerId
    app.delete("/blog/:blogId", blog.deleteBlog);
    // Create a new Customer
    app.delete("/blog", blog.deleteAllBlog);
};

*/
