const db = require("../middleware/dbconnect");
require("dotenv").config();
'use strict';

//constructeur du modele Blog
  const Blog = function(blog) {
    this.blog_id = blog.blog_id;
    this.bloguser_id = blog.user_id;
    this.blog_titre = blog.blog_titre;
    this.blog_text = blog.blog_text;
    this.blog_date = blog.blog_date;
    this.blog_image = blog.blog_image; 
  };
  
//fonction pour créer un blog
Blog.createBlog = (newBlog, result) => {
  db.query("INSERT INTO blogs SET ?", newBlog, (err, res) => {
    if (err) {
      console.log("erreur: ", err);
      result(err, null);
      return;
    }
    console.log("created blog: ", { id: res.insertId, ...newBlog });
    result(null, { id: res.insertId, ...newBlog });
  });
};

//fonction pour trouver un blog
Blog.findById = (BlogId, result) => {
  db.query(`SELECT * FROM blogs WHERE blog_id = ${BlogId}`, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }
    if (res.length) {
      console.log("blog ok: ", res[0]);
      result(null, res[0]);
      return;
    }
    // not found Blog with the id
    result({ kind: "non trouvé" }, null);
  });
}; 

// fonction pour recuperer les blogs
  Blog.getAll = function (result) {
    db.query("SELECT * FROM blogs", (err,res)=> {
        if (err) {
          console.log("erreur:", err);
          result(null,err);
          return;
        }         
        console.log("blogs:",res);
        result(null,res);
      });
  };

  //fonction pour modifier un blog
  Blog.updateById = (BlogId, blog, result) => {
    db.query("UPDATE blogs SET blog_titre = ?, blog_text = ?, blog_date = ?, blog_image = ? WHERE blog_id = ?",
      [blog.blog_titre, blog.blog_text, blog.blog_date, blog.blog_image, BlogId],
      (err, res) => {
        if (err) {
          console.log("erreur: ", err);
          result(null, err);
          return;
        }
        if (res.affectedRows == 0) {
          // not found Blog with the id
          result({ kind: "non trouvé" }, null);
          return;
        }
        console.log("blog modifié: ", { BlogId: BlogId, ...blog });
        result(null, {BlogId: BlogId, ...blog });
      });
  };

  //fonction pour supprimer un blog
  Blog.remove = (id, result) => {
    db.query("DELETE FROM blogs WHERE blog_id = ?", id, (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }
      if (res.affectedRows == 0) {
        // Blog non trouvé avec id
        result({ kind: "non trouvé" }, null);
        return;
      }
      console.log("supprimé: ", id);
      result(null, res);
    });
  };

  //fonction pour tout supprimer
  Blog.removeAll = result => {
    sql.query("DELETE FROM blogs", (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }
      console.log(`deleted ${res.affectedRows} blogs`);
      result(null, res);
    });
  };
 
  module.exports = Blog;
 
  