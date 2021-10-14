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
    const userId = decodedToken.userId;
    //si user ID different
    if (req.body.userId && req.body.userId !== userId) {
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



/*
module.exports = (req, res, next) => {
  try {
    const token = req.headers.authorization.split(' ')[1];
    const decodedToken = jwt.verify(token, process.env.SECRET_TOKEN,);
    const userId = decodedToken.user_id;
    if (req.body.user_id && req.body.user_id !== userId) {
      throw 'Invalid user ID';
    } else {
      console.log(reussi);
      next();
    }
  } catch {
    res.status(401).json({ error: new Error('Invalid request!')
    });
  };
};
*/