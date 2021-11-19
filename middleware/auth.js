const jwt = require('jsonwebtoken');
require("dotenv").config();

// securiser les routes
module.exports = (req, res, next) => {
  try {
    // recuperer le token qui provient de la requete
    const token = req.headers.authorization.split(' ')[1];
    //decoder le token
    const decodedToken = jwt.verify(token, process.env.SECRET_TOKEN, );
      
    // recuperer le user ID
    const userId = decodedToken.user_id;
    //si user ID different
    if (req.body.user_id && req.body.user_id !== userId) {
      throw 'Invalid user ID';
    } else {
      next();
    }
  } catch {
    res.status(401).json({
      error: new Error('Invalid request!')
    });
  }
};



