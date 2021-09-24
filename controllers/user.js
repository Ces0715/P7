// hasher le MP des utilisateurs
const bcrypt = require('bcrypt');
// recuperer model user
const User = require('../models/user');
//attribution token à utilisateur
const jwt = require('jsonwebtoken');
const validator = require("email-validator");

exports.signup = (req, res, next) => {
  const isValidateEmail = validator.validate(req.body.email)
  if (!isValidateEmail) {
    res.setHeader('Content-Type', 'application/json');
    res.status(400).json({ error: "Veuillez entrer un email valide" });
  }
  else {
    bcrypt.hash(req.body.password, 10)
      .then(hash => {
        const user = new User({
          user_id: req.body.user_id,
          user_nom: req.body.user_nom,
          user_prenom: req.body.user_prenom,
          user_mail: req.body.user_mail,
          user_login: req.body.user_login,
          user_mp: hash
        });
        user.save()
          .then(() => res.status(201).json({ message: 'Utilisateur créé !' }))
          .catch(error => res.status(400).json({ error }));
      })
      .catch(error => res.status(500).json({ error }));
  }
};

exports.login = (req, res, next) => {
  User.findOne({ user_mail: req.body.user_mail })
    .then(user => {
      if (!user) {
        return res.status(401).json({ error: 'Utilisateur non trouvé !' });
      }
      bcrypt.compare(req.body.user_mp, user.user_mp)
        .then(valid => {
          if (!valid) {
            return res.status(401).json({ error: 'Mot de passe incorrect !' });
          }
          res.status(200).json({
            userId: user._id,
            token: jwt.sign(
              { userId: user._id },
              process.env.SECRET_TOKEN,
              //'RANDOM_TOKEN_SECRET',
              { expiresIn: '24h' }
            )
          });
        })
        .catch(error => res.status(500).json({ error }));
    })
    .catch(error => res.status(500).json({ error }));
};