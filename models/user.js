//const mysql = require('mysql');
const sql = require('mysql');

//constructeur
  const User = function(user1) {
    this.user_id = user1.user_id;
    this.user_nom = user1.user_nom;
    this.user_prenom = user1.user_prenom;
    this.user_login = user1.user_login;
    this.user_mail = user1.user_mail;
  };

  User.create = (newUser, result) => {
    sql.query("INSERT INTO user SET ?", newUser, (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(err, null);
        return;
      }
      console.log("created user: ", { id: res.insertId, ...newUser });
      result(null, { id: res.insertId, ...newCustomer });
    });
  };

  User.findById = (UserId, result) => {
    sql.query(`SELECT * FROM user WHERE id = ${UserId}`, (err, res) => {
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

  User.getAll = result => {
    sql.query("SELECT * FROM user", (err, res) => {
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



  