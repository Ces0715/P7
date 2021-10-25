const db = require("../middleware/dbconnect");
const sql = require("./db");
require("dotenv").config();

//constructeur
  const Blog = function(blog) {
    this.blog_id = blog.blog_id;
    this.bloguser_id = blog.bloguser_id;
    this.blog_titre = blog.blog_titre;
    this.blog_text = blog.blog_text;
    this.blog_date = blog.blog_date;
    this.blog_image = blog.blog_image;
  };
  
  //fonction pour récuperer infos tous les blogs
  Blog.getAllBlog = (result) => {
    sql.query("SELECT * FROM blogs", (err, res) => {
      //selectionner infos et joindre les 2 tables  
    //db.query("SELECT blogs.blog_id, blogs.bloguser_id, blogs.blog_titre, blogs.blog_text, blogs.blog_date, blogs.blog.blog_image FROM blogs INNER JOIN users ON blogs.userblog_id = users.user_id ORDER BY blogs.blog_id DESC", 
      if (err) {
        console.log("erreur:", err);
        //result(null, err);
        return;
      }
      console.log("blogs:", res);
      //result(null, res);
    });
  };

  //fonction pour créer un blog
  Blog.createBlog = (newBlog, result) => {
    sql.query("INSERT INTO blogs SET ?", newBlog, (err, res) => {
      if (err) {
        console.log("erreur: ", err);
        result(err, null);
        return;
      }
      console.log("created blog: ", { id: res.insertId, ...newBlog });
      result(null, { id: res.insertId, ...newBlog });
    });
  };

  Blog.getOneBlog = (BlogId, result) => {
    sql.query(`SELECT * FROM blogs WHERE blog_id = ${BlogId}`, (err, res) => {
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

  Blog.modifyOneBlog = (id, blog, result) => {
    sql.query("UPDATE blogs SET blog_titre = ?, blog_text = ?, blog_date = ?, blog_images = ? WHERE blog_id = ?",
      [blog.blog_titre, blog.blog_text, blog.blog_date, blog.blog_image, blog.blog_id],
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
        console.log("blog modifié: ", { id: id, ...blog });
        result(null, { id: id, ...blog });
      });
  };

  Blog.deleteBlog = (id, result) => {
    sql.query("DELETE FROM blogs WHERE blog_id = ?", id, (err, res) => {
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

  module.exports = Blog;









  /*
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
 */
  
 
  