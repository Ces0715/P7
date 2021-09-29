const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const multer = require('../middleware/multer-config');
const blogCtrl = require('../controllers/blog');

router.get('/', auth, blogCtrl.getAllBlog);
router.post('/', auth, multer, blogCtrl.createBlog);
router.get('/:id', auth, blogCtrl.getOneBlog);
router.put('/:id', auth, blogCtrl.modifyOneBlog);
router.delete('/:id', auth, blogCtrl.deleteBlog);

module.exports = router;

/*
module.exports = app => {
    const blogs = require("../controllers/blog.js");
    // Create a new Customer
    app.post("/blogs", blogs.create);
    // Retrieve all Customers
    app.get("/blogs", blogs.findAll);
    // Retrieve a single Customer with customerId
    app.get("/blogs/:blogId", blogs.findOne);
    // Update a Customer with customerId
    app.put("/blogs/:blogId", blogs.update);
    // Delete a Customer with customerId
    app.delete("/blogs/:blogId", blogs.delete);
    // Create a new Customer
    app.delete("/blogs", blogs.deleteAll);
};
*/