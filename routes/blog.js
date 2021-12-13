const express = require('express');
const router = express.Router();
const BlogCtrl = require('../controllers/blog');
const auth = require('../middleware/auth');
const multer = require('../middleware/multer-config');
//const db = require("../middleware/dbconnect");

router.post('/',auth, multer, BlogCtrl.createBlog);
router.get('/',auth, BlogCtrl.getAllBlog);
router.get('/:id',auth, BlogCtrl.findOneBlog);
router.put('/:id',auth, BlogCtrl.updateBlog);
router.delete('/:id',auth, BlogCtrl.delete);
router.delete('/',auth, BlogCtrl.deleteAll); 

module.exports = router;


