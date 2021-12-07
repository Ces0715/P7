const express = require('express');
const router = express.Router();
const BlogCtrl = require('../controllers/blog');
const auth = require('../middleware/auth');
const multer = require('../middleware/multer-config');
//const db = require("../middleware/dbconnect");

router.post('/', multer, BlogCtrl.createBlog);
router.get('/',BlogCtrl.getAllBlog);
router.get('/:id', BlogCtrl.findOneBlog);
router.put('/:id', BlogCtrl.updateBlog);
router.delete('/:id', BlogCtrl.delete);
router.delete('/', BlogCtrl.deleteAll); 

module.exports = router;


