const bcrypt = require('bcrypt');
// recuperer model user
const User = require('../models/user');
//attribution token à utilisateur
const jwt = require('jsonwebtoken');
const validator = require("email-validator");
require("dotenv").config();
const db = require("../middleware/dbconnect");

exports.getAllUser = function (_req, res) {
  db.query('SELECT * FROM users', function (error, results, _fields) {
    if (error) throw error;
    return res.send({ data: results, message: 'user list.' });
  });
};

// Création d'un nouvel utilisateur OK
exports.signUp = function (req, res) {
  //si rien crée, error
  if (!req.body) {
    res.status(400).send({
      message: "You must fill-in the form!",
    });
  }
  else {
    bcrypt
      .hash(req.body.user_mp,10) //password hashing
      .then((hash) => {
        //creer nouvel user
        if (!req.file) {
          const user = new User({
            user_id: req.body.user_id,
            user_nom: req.body.user_nom,
            user_prenom: req.body.user_prenom,
            user_login: req.body.user_login,
            user_mail: req.body.user_mail,
            user_mp: hash,
          });

          //enregistrer dans db
          User.create(user, (err, data) => {
            if (err)
              res.status(500).send({
                message: err.message || "Something went wrong when creating the user !",
              });
            else res.send(data);
          });
        } else if (req.file) {
          const user = new User({
            user_id: req.body.user_id,
            user_nom: req.body.user_nom,
            user_prenom: req.body.user_prenom,
            user_login: req.body.user_login,
            user_mail: req.body.user_mail,
            user_mp: hash,
          });

          //conserver dans db
          User.create(user, (err, data) => {
            if (err)
              res.status(500).send({
                message: err.message || "erreur dans creation nouvel user !",
              });
            else res.send(data);
          });
        }
      });
  }
};








//function to conenct to account
exports.login = function (req, res) {
  const email = maskData.maskEmail2(req.body.email);
  const password = req.body.password;

  //if email and password are filled-in
  if (email && password) {
      User.login(email, password, (err, data) => {
          if (err)
              res.status(500).send({
                  message: err.message || "Something went wrong when logging into account !",
              });
          else res.send(data);
      });
  } else {
      //if the form isn't filled-in, throw error
      res.status(500).json({ message: "You must fill-in the form" });
  }
};

exports.findOneUser = (req, res) => {
  User.findById(req.params.id, (err, data) => {
    if (err) {
      if (err.kind === "non trouvé") {
        res.status(404).send({
          message: `Non trouvé avec id ${req.params.id}.`
        });
      } else {
        res.status(500).send({
          message: "Erreur " + req.params.id
        });
      }
    } else res.send(data);
  });
};

  //Fonction qui gère la logique métier de la route POST (connexion d'un user existant dans la database)
  exports.login = (req, res, _next) => {
    //Recherche de l'utilisateur dans la DB via son email
    let sql1 = `SELECT * FROM users WHERE user_mail = ?`;
    db.query(sql1, [req.body.user_mail], function (err, data, fields) {
      if (data.length === 0) {
        return res.status(404).json({ err: "Utilisateur non trouvé !" });
      }
      //Si on a trouvé le mail dans la DB, on compare le hash du nouveau mot de passe au hash de la DB
      bcrypt.compare(req.body.user_mp, data[0].user_mp)
        .then(valid => {
          if (!valid) {
            return res.status(401).json({ error: "Mot de passe incorrect !" });
          }
          res.status(200).json({
            userId: data[0].user_id,
            user_nom: data[0].user_nom,

            //Si le password est correct, encodage d'un nouveau token
            token: jwt.sign(
              { userId: data[0].user_id, user_nom: data[0].user_nom, },
              process.env.SECRET_TOKEN,
              { expiresIn: "24h" }
            )
          });
        })
        .catch(error => res.status(500).json({ error }));
    });
  };


/*
exports.findOneUser = (userId, result) => {
  db.query(`SELECT * FROM users WHERE user_id = ${userId}`, (err, res) => {
    if (err) {
      console.log("erreur: ", err);
      result(err, null);
      return;

    } else if (res.length) {
      result(null, res[0]);
      return;
    }
  });
};
*/