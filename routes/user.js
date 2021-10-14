const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const users = require('../controllers/user');

router.get('/', users.getAllUsers);
router.post('/signup', users.signUp);
router.post('/login', users.login);



module.exports = router;











//router.get('/:id', auth, users.getOneBlog);
//router.put('/:id', auth, users.modifyOneBlog);
//router.delete('/:id', auth, users.deleteBlog);