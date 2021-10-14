// hasher le MP des utilisateurs
const bcrypt = require('bcrypt');
// recuperer model user
const User = require('../models/user');
//attribution token à utilisateur
const jwt = require('jsonwebtoken');
const validator = require("email-validator");
require("dotenv").config();
const sql = require("../middleware/dbconnect");

exports.signUp = (req, res, _next) => {
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
        sql.query(sql1, [values], function(err, data, fields) {
            if (err) {
                return res.status(400).json({err}); 
            }
//Si absence d'erreur, on crée un nouveau token pour ce new user
let sql1 = `SELECT * FROM users WHERE user_mail = ?`;
sql.query(sql1, [req.body.user_mail], function(err, data, fields) {
    if (err) {
    return res.status(404).json({err}); 
    }
    res.status(200).json({ 
        user_id: data[0].user_id, 
        user_nom: data[0].user_nom, 
        //Encodage d'un nouveau token
        token: jwt.sign(
            {userId : data[0].user_id, user_nom: data[0].user_nom,},
            process.env.SECRET_TOKEN,
            {expiresIn: "24h"}
        )
    });
});
});
})
.catch(error => res.status(500).json({error})); 
};


//Fonction qui gère la logique métier de la route POST (connexion d'un user existant dans la database)
exports.login = (req, res, next) => {
  //Recherche de l'utilisateur dans la DB via son email 
  let sql1 = `SELECT * FROM users WHERE user_mail = ?`;
  sql.query(sql1, [req.body.user_mail], function(err, data, fields) {
      if (data.length === 0) {
          return res.status(404).json({err: "Utilisateur non trouvé !"}); 
      } 
      //Si on a trouvé le mail dans la DB, on compare le hash du nouveau mot de passe au hash de la DB
      bcrypt.compare(req.body.password, data[0].password)
          .then(valid => {
              if(!valid) {
                  return res.status(401).json({error: "Mot de passe incorrect !"});
              }
              res.status(200).json({
                  userId: data[0].user_id,
                  user_nom: data[0].user_nom,
                  
                  //Si le password est correct, encodage d'un nouveau token
                  token: jwt.sign(
                      {userId : data[0].user_id, user_nom: data[0].user_nom,},
                      process.env.SECRET_TOKEN,
                      {expiresIn: "24h"}
                  )
              });
          })
          .catch(error => res.status(500).json({error}));  
  });
};
  

//Fonction qui gère la logique métier de la route GET (affichage des données d'un user)
/*
exports.getAllUsers = (req, res, next) => {
    let sql1 = `SELECT * FROM users `;
    sql.query(sql1, [req.params.id], function(err, data, fields) {
    if (err) {
        return res.status(404).json({err});
    }
    res.json({status: 200, data, message: "User affiché avec succès !"})
  });
};
*/
exports.getAllUsers = function (result) {
  sql.query("SELECT * FROM users", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }
    console.log("user: ", res);
    result(null, res);
  });
};

/*
exports.signUp = (req, res, _next) => {
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

exports.login = (req, res, _next) => {
  User.findOne({ 
    user_mail: req.body.user_mail })
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

exports.getAllUsers = (_req, res) => {
  console.log("message");

  /*
  User.find((err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving customers."
      });
    else res.send(data);
  });
 */ 
};

module.exports = User;