const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const dotenv = require("dotenv");
dotenv.config();

const JWT_SECRET = process.env["JWT_SECRET"];

const generateToken = (userId) => {
  return jwt.sign({ userId }, JWT_SECRET, { expiresIn: "24h" });
};

async function bcryptPassword(password) {
  try {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    return hashedPassword;
  } catch (error) {
    console.log(error);
  }
}

async function comparePasswords(target, source) {
  return bcrypt.compare(target, source);
}

module.exports = { generateToken, bcryptPassword, comparePasswords };
