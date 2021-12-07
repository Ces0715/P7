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

exports.getOneUser = (UserId, result) => {
  db.query(`SELECT * FROM users WHERE user_id = ${UserId}`, (err, res) => {
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

//function to create an account
exports.signUp = function (req, res) {
  //si rien crée, error
  if (!req.body) {
    res.status(400).send({
      message: "You must fill-in the form!",
    });
  }
  else {
    //hash password
    bcrypt
      .hash(req.body.password, 10) //password hashing
      .then((hash) => {
        //create a new user with the frontend inputs
        if (!req.file) {
          const user = new User({
            user_id: req.body.user_id,
            user_nom: req.body.user_nom,
            user_prenom: req.body.user_prenom,
            user_login: req.body.user_login,
            user_mail: req.body.user_mail,
            user_mp: hash,
          });

          //save post to the db
          User.signUp(user, (err, data) => {
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

          //save post to the db
          User.signup(user, (err, data) => {
            if (err)
              res.status(500).send({
                message: err.message || "Something went wrong when creating the user !",
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






exports.login = (req, res, next) => {
  User.findOne({
      where: {
          user_mail: req.body.user_mail} })
      .then(user => {
          if(!user) {
              return res.status(401).json({ error: 'Utilisateur non trouvé!' })
          }
          console.log(req.body.user_mp);
          console.log(user.user_mp);
          bcrypt.compare(req.body.user_mp, user.user_mp)
          .then( valid => {
              if (!valid) {
                  return res.status(401).json({ error: 'Mot de passe incorrect!' })
              }
              console.log(user, 'user when log in')
              res.status(200).json({
                  id: user.id,
                  uuid: user.uuid,
                  token: jwt.sign(
                      //payload
                      { userId: user.uuid },
                      'RANDOM_TOKEN_SECRET',
                      { expiresIn:'24h' }
                  ),
                  email: user.email,
                  first_name: user.first_name,
                  last_name: user.last_name,
                  is_admin: user.is_admin
              });
          })
          .catch(error => res.status(500).json({ error: 2 + error.toString() }))
      })
      .catch(error => res.status(500).json({ error: 1 + error.toString() }));
}



/*
exports.signup = (req, res, _next) => {
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
        //Enregistrement du new user dans la base de données
        let sql1 = `INSERT INTO users(user_id, user_nom, user_prenom, user_mail, user_login, user_mp) VALUES (?)`;
        let values = [user.user_id, user.user_nom, user.user_prenom, user.user_mail, user.user_login, user.user_mp];
        sql.query(sql1, [values], function (err, data, fields) {
          if (err) {
            return res.status(400).json({ err });
          }
          //Si absence d'erreur, on crée un nouveau token pour ce new user
          let sql1 = `SELECT * FROM users WHERE user_mail = ?`;
          sql.query(sql1, [req.body.user_mail], function (err, data, fields) {
            if (err) {
              return res.status(404).json({ err });
            }
            res.status(200).json({
              user_id: data[0].user_id,
              user_nom: data[0].user_nom,
              //Encodage d'un nouveau token
              token: jwt.sign(
                { userId: data[0].user_id, user_nom: data[0].user_nom, },
                process.env.SECRET_TOKEN,
                { expiresIn: "24h" }
              )
            });
          });
        });
      })
      .catch(error => res.status(500).json({ error }));
  };


  //Fonction qui gère la logique métier de la route POST (connexion d'un user existant dans la database)
  exports.login = (req, res, _next) => {
    //Recherche de l'utilisateur dans la DB via son email
    let sql1 = `SELECT * FROM users WHERE user_mail = ?`;
    sql.query(sql1, [req.body.user_mail], function (err, data, fields) {
      if (data.length === 0) {
        return res.status(404).json({ err: "Utilisateur non trouvé !" });
      }
      //Si on a trouvé le mail dans la DB, on compare le hash du nouveau mot de passe au hash de la DB
      bcrypt.compare(req.body.password, data[0].password)
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


*/

