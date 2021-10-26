const express = require('express');
const router = express.Router();
const BlogCtrl = require('../controllers/blog');
//const auth = require('../middleware/auth');
//const multer = require('../middleware/multer-config');
//const db = require("../middleware/dbconnect");

router.post('/',BlogCtrl.createBlog);
router.get('/',BlogCtrl.getAllBlog);
router.get('/blogs/:id', BlogCtrl.getOneBlog);
router.put('/blogs/:id', BlogCtrl.modifyOneBlog);
router.delete('/blogs/:id', BlogCtrl.deleteBlog);
 /*
router.post("/blogs", BlogCtrl.create);
router.get("/blogs", BlogCtrl.findAll);
router.get("/blogs/:blogId", BlogCtrl.findOne);
router.put("/blogs/:blogId", BlogCtrl.update);
router.delete("/blogs/:blogId", BlogCtrl.delete);
router.delete("/customers", BlogCtrl.deleteAll);
*/
;


module.exports = router;





/*
router.get('/', auth, blogs.getAllBlog);
router.post('/', auth, multer, blogs.createBlog);
router.get('/:id', auth, blogs.getOneBlog);
router.put('/:id', auth, blogs.modifyOneBlog);
router.delete('/:id', auth, blogs.deleteBlog);
 */

