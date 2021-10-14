const sql = require("../middleware/dbconnect");

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
  
  module.exports = User;

/*
  User.signUp = (newUser, result) => {
    sql.query("INSERT INTO users SET ?", newUser, (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(err, null);
        return;
      }
      console.log("created user: ", { id: res.insertId, ...newUser });
      result(null, { id: res.insertId, ...newUser });
    });
  };

  User.login = (UserId, result) => {
    sql.query(`SELECT * FROM users WHERE id = ${UserId}`, (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(err, null);
        return;
      }
      if (res.length) {
        console.log("found user: ", res[0]);
        result(null, res[0]);
        return;
      }
      // not found Customer with the id
      result({ kind: "not_found" }, null);
    });
  };

  
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

  module.exports = User;
  
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


  