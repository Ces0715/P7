const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const UserCtrl = require('../controllers/user');

router.post('/signup', UserCtrl.signup);
router.post('/login', UserCtrl.login);
router.get('/api/users', UserCtrl.getAllUser);

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

router.get('/:id', auth, users.getOneBlog);
router.put('/:id', auth, users.modifyOneBlog);
router.delete('/:id', auth, users.deleteBlog);
*/