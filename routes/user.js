const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const UserCtrl = require('../controllers/user');

router.post('/signup', UserCtrl.signUp);
router.post('/login', UserCtrl.login);
router.get('/', UserCtrl.getAllUser);
router.get('/:id',auth, UserCtrl.getOneUser);
//router.put('/:id', auth, UserCtrl.modifyOneUser);
//router.delete('/:id', auth, UserCtrl.deleteUser);

module.exports = router;






/*
// Ajout nouvel user 
router.post('/api/users', function (req, res) {
    let user = req.body.user;
    if (!user) {
      return res.status(400).send({ error:true, message: 'Ajouter nouvel user' });
    }
   db.query("INSERT INTO users SET ? ", { user: user }, function (error, results, fields) {
  if (error) throw error;
    return res.send({ error: false, data: results, message: 'User crée.' });
    });
  });
*/