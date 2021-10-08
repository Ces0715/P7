//const mysql = require('mysql');
const sql = require("../middleware/dbconnect");

//constructeur
  const Blog = function(blog) {
    this.blog_id = blog.blog_id;
    this.bloguser_id = blog.bloguser_id;
    this.blog_titre = blog.blog_titre;
    this.blog_text = blog.blog_text;
    this.blog_date = blog.blog_date;
    this.blog_image = blog.blog_image;
  };
  console.log(Blog);

  Blog.createBlog = (newBlog, result) => {
    sql.query("INSERT INTO blogs SET ?", newBlog, (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(err, null);
        return;
      }
      console.log("created blog: ", { id: res.insertId, ...newBlog });
      result(null, { id: res.insertId, ...newBlog });
    });
  };

  Blog.getOneBlog = (BlogId, result) => {
    sql.query(`SELECT * FROM blogs WHERE id = ${BlogId}`, (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(err, null);
        return;
      }
      if (res.length) {
        console.log("found blog: ", res[0]);
        result(null, res[0]);
        return;
      }
      // not found Blog with the id
      result({ kind: "not_found" }, null);
    });
  };

  Blog.getAllBlog = result => {
    sql.query("SELECT * FROM blogs", (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }
      console.log("blog: ", res);
      result(null, res);
    });
  };

  Blog.modifyOneBlog = (id, blog, result) => {
    sql.query("UPDATE blogs SET titre = ?, text = ?, date = ?, images = ? WHERE id = ?",
      [blog.blog_titre, blog.blog_text, blog.blog_date, blog.blog_image, id],
      (err, res) => {
        if (err) {
          console.log("error: ", err);
          result(null, err);
          return;
        }
        if (res.affectedRows == 0) {
          // not found Blog with the id
          result({ kind: "not_found" }, null);
          return;
        }
        console.log("updated blog: ", { id: id, ...blog });
        result(null, { id: id, ...blog });
      });
  };

  Blog.deleteBlog = (id, result) => {
    sql.query("DELETE FROM blogs WHERE id = ?", id, (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }
      if (res.affectedRows == 0) {
        // not found Blog with the id
        result({ kind: "not_found" }, null);
        return;
      }
      console.log("deleted user with id: ", id);
      result(null, res);
    });
  };
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
  module.exports = Blog;
 
  