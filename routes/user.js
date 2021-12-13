const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const multer = require("../middleware/multer-config");
const UserCtrl = require('../controllers/user');

router.post('/signup', multer, UserCtrl.signUp);
router.post('/login', UserCtrl.login);
router.get('/', UserCtrl.getAllUser);
router.get('/:id',auth, UserCtrl.findOneUser);

//router.put('/:id', auth, UserCtrl.modifyOneUser);
router.delete('/:id',auth, UserCtrl.deleteUser);

module.exports = router;






