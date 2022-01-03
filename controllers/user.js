const bcrypt = require('bcrypt');
// recuperer model user
const User = require('../models/user');
//attribution token à utilisateur
const jwt = require('jsonwebtoken');
const validator = require("email-validator");
require("dotenv").config();
const db = require("../middleware/dbconnect");
//const passwordValidator = require("password-validator");
const auth = require('../middleware/auth');

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
            isAdmin:0,
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

//function to conect to account
exports.login = function (req, res) {
  const email = req.body.user_mail;
  const password = req.body.user_mp;
  //si mail et mp enregistré
  if (email && password) {
      User.login(email, password, (err, data) => {
          if (err)
              res.status(500).send({
                  message: err.message || "probleme avec login !",
              });
          else { 
          console.log(data); 
          res.status(202).send(data); 
        }
      });
  } else {
      //if loggin incorrect
      res.status(500).json({ message: "enregister correctement" });
  }
};

//supprimer un user
exports.deleteUser = (req, res) => {
  User.delete (req.params.id, (err, data) => {
    if (err) {
      if (err.kind === "non trouvé") {
        res.status(404).send({
          message: `Non trouvé avec id ${req.params.id}.`
        });
      } else {
        res.status(500).send({
          message: "impossible de supprimer " + req.params.id
        });
      }
    } else res.send({ message: `User supprimé!` });
  });
};


//recuperer un user
exports.findOneUser = function (req, res) {
  const token = req.headers.authorization.split(' ')[1]; //extracting token from authorization header
  const decodedToken = jwt.verify(token, process.env.SECRET_TOKEN); //decoding token with the key indicated at controllers/user.controller.js:53
   const userId = decodedToken.userId; //defining decoded token as user id

    User.findById(userId, (err, data) => {
        if (err) {
            res.status(500).send({
                message: "Error retrieving user with this id : " + userId,
            });
        } else res.send(data);
    });
};
/*
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

 */
