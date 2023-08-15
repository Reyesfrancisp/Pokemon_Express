const jwt = require("jsonwebtoken");
const { User } = require('../models');

async function createToken(user_id) {
  const token = await jwt.sign(
    { user_id },
    process.env.JWT_SECRET,
    { expiresIn: '1h' } // Change token expiry to 1 hour
  );

  return token;
}

async function validateToken(token) {
  try {
    const is_valid = await jwt.verify(token, process.env.JWT_SECRET);
    return is_valid;
  } catch (err) {
    throw new Error('Invalid or expired token');
  }
}

async function isAuthenticated(req, res, next) {
  try {
    const token = req.cookies.token;

    if (!token) {
      console.log("Illegal!")
      throw new Error('You are not authorized to perform that action');
    }

    const data = await validateToken(token);
    const user = await User.findById(data.user_id);

    req.user = user;
    next();
  } catch (err) {
    return res.status(401).send({
      error: true,
      message: err.message
    });
  }
}

module.exports = { createToken, validateToken, isAuthenticated };