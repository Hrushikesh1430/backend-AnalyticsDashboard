const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");

dotenv.config();

const JWT_SECRET = process.env.JWT_SECRET;

function authVerify(req, res, next) {
  const token = req.headers.authorization;

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = { userId: decoded.userId, email: decoded.email };
    console.log(req.user);
    return next();
  } catch (error) {
    res.status(401).json({ message: "Unauthorized access please add token" });
  }
}

module.exports = { authVerify };
