const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const multer = require('../middleware/multer-config');
const blogs = require('../controllers/blog');

router.get('/', auth, blogs.getAllBlog);
router.post('/', auth, multer, blogs.createBlog);
router.get('/:id', auth, blogs.getOneBlog);
router.put('/:id', auth, blogs.modifyOneBlog);
router.delete('/:id', auth, blogs.deleteBlog);

module.exports = router;


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
