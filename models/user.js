const sql = require("../middleware/dbconnect");
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
  console.log(User);
  
  User.signup = (newUser, result) => {
    sql.query("INSERT INTO users SET ?", newUser, (err, res) => {
      if (err) {
        console.log("erreur: ", err);
        result(err, null);
        return;
      }
      console.log("user créé: ", { id: res.insertId, ...newUser });
      result(null, { id: res.insertId, ...newUser });
    });
  };

  User.login = (mail,mp, result) => {
    sql.query(`SELECT * FROM users WHERE email = ?`,mail, (err, res) => {
       //si email dans bd
       if (res.length > 0) {
        //comparer le mp avec celui de bd
        bcrypt.compare(mp, res[0].user_mp).then((valid) => {
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
        // if the email doesn't match, throw error
        console.log("error :", err);
        result(err, null);
        return;
    }
});

  User.getAllUsers =  function (result) {
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

  User.getOne = (userId, result) => {
    //retrieves infos for the user whse id is provided
    sql.query(`SELECT user_id, user_nom, user_prenom, user_login, user_mp, user_mail FROM users WHERE id = ${userId}`, (err, res) => {
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

