const express = require('express');
const router = express.Router();

const auth = require('../middleware/auth');
const multer = require('../middleware/multer-config');

const blogCtrl = require('../controllers/blog');

router.get('/', auth, blogCtrl.getAllBlog);
router.post('/', auth, multer, blogCtrl.createBlog);
router.get('/:id', auth, blogCtrl.getOneBlog);
//router.put('/:id', auth, blogCtrl.modifyBlog);
router.delete('/:id', auth, blogCtrl.deleteBlog);

module.exports = router;