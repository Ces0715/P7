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
    const blog = require("../controllers/blog.js");
    // Create a new Customer
    app.post("/blogs", blog.create);
    // Retrieve all Customers
    app.get("/blogs", blog.findAll);
    // Retrieve a single Customer with customerId
    app.get("/blogs/:blogId", blog.findOne);
    // Update a Customer with customerId
    app.put("/blogs/:blogId", blog.update);
    // Delete a Customer with customerId
    app.delete("/blogs/:blogId", blog.delete);
    // Create a new Customer
    app.delete("/blogs", blog.deleteAll);
};

*/
