const jwt = require('jsonwebtoken');

const JWT_SECRET = process.env.JWT_SECRET || 'thetopsecret';

const auth = (req, res, next) => {
  const token = req.header('Authorization')?.replace('Bearer ', '');
  // console.log("Token:", token);

  if (!token) {
    return res.status(401).json({ message: 'No token, authorization denied' });
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    // console.log("Decoded:", decoded);
    req.user = decoded;
    next();
  } catch (error) {
    res.status(401).json({ message: 'Token is not valid' });
  }
};

module.exports = auth;