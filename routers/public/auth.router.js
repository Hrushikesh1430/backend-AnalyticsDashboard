const express = require("express");
const router = express.Router();

const { User } = require("../../models/user.model");
const { generateToken, bcryptPassword, comparePasswords } = require("../../utils/utils");

async function signup(userDetails) {
  try {
    const hashedPassword = await bcryptPassword(userDetails.password);

    const user = new User({ ...userDetails, password: hashedPassword });
    console.log(user);
    const newUser = await user.save();
    return newUser;
  } catch (error) {
    throw error;
  }
}

router.post("/signup", async (req, res) => {
  try {
    const savedUser = await signup(req.body);
    const token = generateToken(savedUser._id);
    res.json({ user: savedUser, token, success: true, message: "Sign Up Successful" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Failed to create user account" });
  }
});

async function login(email, password) {
  try {
    const user = await User.findOne({ email });
    if (user) {
      const passwordMatch = await comparePasswords(password, user.password);
      if (passwordMatch) {
        const token = generateToken(user._id);
        return {
          data: { user, token },
          success: true,
          message: "Login Successful",
        };
      } else {
        throw new Error("Invalid credentials");
      }
    } else {
      throw new Error("Email does not exist");
    }
  } catch (error) {
    throw error;
  }
}

router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const userDetails = await login(email, password);
    res.json(userDetails);
  } catch (error) {
    res.status(401).json({ error: "Invalid credentials" });
  }
});

module.exports = router;
