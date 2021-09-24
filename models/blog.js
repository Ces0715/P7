const mysql = require('mysql');

//modele de données
const blogSchema = mysql.Schema({
    blo_id: { type: String, required: true },
    blog_titre: { type: String, required: true },
    blog_text: { type: String, required: true},
    blog_date: { type: String, required: true },
    blog_image: { type: String, required: true},
    //likes: { type: Number,required: false,  default:0},
    //dislikes: { type: Number,required: false,default:0},
    //usersLiked:  { type: [String], required: false },
    //usersDisliked:  { type: [String], required: false },
  });
  
  module.exports = mysql.model('blog', blogSchema);