const db = require("../middleware/dbconnect");
require("dotenv").config();
'use strict';
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

//constructeur
  const User = function(user) {
    this.user_id = user.user_id;
    this.user_nom = user.user_nom;
    this.user_prenom = user.user_prenom;
    this.user_login = user.user_login;
    this.user_mail = user.user_mail;
    this.user_mp = user.user_mp;
  };

  module.exports = User;

  User.getAll = function (result) {
    db.query("SELECT * FROM users", (err,res)=> {
        if (err) {
          console.log("erreur:", err);
          result(null,err);
          return;
        }  
        console.log("users:",res);
        result(null,res);
      });
  };

  
//fonction pour créer un nouveau compte
  User.signup = (newUser, result) => {
    // mettre info dans la table users
    db.query("INSERT INTO users SET ?", newUser, (err, res) => {
      if (err) {
        console.log("erreur:", err);
        result(err, null);
        return;
      }
      console.log("user créé: ", { id: res.insertId, ...newUser });
      result(null, { id: res.insertId, ...newUser });
    });
  };

  //fonction pour créer login du compte
  User.login = (user_mail, user_mp, result) => {
    // recuperer infos du user qui a un mail
    db.query(`SELECT * FROM users WHERE user_mail = ?`,user_mail, (err, res) => {
       //si email dans bd
       if (res.length > 0) {
        //comparer le mp avec celui de la bd
        bcrypt.compare(user_mp, res[0].user_mp).then((valid) => {
            // si pas de correspondance erreur
            if (!valid) {
                console.log("error :", err);
                result(err, null);
                return;
            } else {
                //si ok envoie des infos et creation token
                result(null, {
                    userId: res[0].user_id,
                    mail: res[0].user_mail,
                    token: jwt.sign({ userId: res[0].user_id }, "RANDOM_TOKEN_SECRET", { expiresIn: "24h" }),
                });
            }
        });
    } else {
        // si pas de correspondance renvoie une erreur
        console.log("error :", err);
        result(err, null);
        return;
    }
});

  //fonction pour recuperer un user
  User.getOne = (userId, result) => {
    //retrieves infos for the user whse id is provided
    db.query(`SELECT user_id, user_nom, user_prenom, user_login, user_mp, user_mail FROM users WHERE id = ${userId}`, (err, res) => {
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
module.exports = User;
}
 


/*
  User.updateById = (id, user, result) => {
    sql.query("UPDATE users SET mail = ?, nom = ?, prenom = ?, login = ?, mp = ? WHERE id = ?",
      [user.user_mail, user.user_nom, user.user_prenom, user.user_login, user.user_mp, id],
      (err, res) => {
        if (err) {
          console.log("error: ", err);
          result(null, err);
          return;
        }
        if (res.affectedRows == 0) {
          // not found User with the id
          result({ kind: "not_found" }, null);
          return;
        }
        console.log("updated user: ", { id: id, ...user });
        result(null, { id: id, ...user });
      });
  };
 
  User.remove = (id, result) => {
    sql.query("DELETE FROM users WHERE id = ?", id, (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }
      if (res.affectedRows == 0) {
        // not found User with the id
        result({ kind: "not_found" }, null);
        return;
      }
      console.log("deleted user with id: ", id);
      result(null, res);
    });
  };
  
  User.removeAll = result => {
    sql.query("DELETE FROM users", (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }
      console.log(`deleted ${res.affectedRows} users`);
      result(null, res);
    });
  };

*/

