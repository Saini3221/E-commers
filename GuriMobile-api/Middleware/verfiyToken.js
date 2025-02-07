const jwt = require("jsonwebtoken");
require("dotenv").config();

// Middleware to verify JWT token
const verifyToken = (req, res, next) => {
    const token = req.headers['authorization']; // Extract token from header
  
    if (!token) {
      return res.status(401).json({ message: "Token is missing" });
    }
  
    // Remove 'Bearer ' from the start of token (if included)
    const actualToken = token.split(" ")[1];
  
    jwt.verify(actualToken, process.env.SECRET_KEY, (err, decoded) => {
      if (err) {
               
        return res.status(403).json({ message: "Token is invalid or expired" });
      }
  
      // Attach decoded user information to request
      req.user = decoded;
      // console.log(req.user.id);
      
      next(); // Continue with the next middleware or route handler
    });
  };

  module.exports = verifyToken;