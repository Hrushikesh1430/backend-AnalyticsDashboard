const express = require("express");
const router = express.Router();

const { User } = require("../../models/user.model");

router.get("/:userID", async (req, res) => {
  try {
    const { userId } = req.user;
    const { userID: requestedUser } = req.params;

    if (userId != requestedUser) {
      res.status(403).json({ message: "Trying to access unauthorized" });
    } else {
      const user = await User.findById({ _id: requestedUser });
      if (user) {
        res.status(200).json({ userDetails: user });
      } else {
        res.status(403).json({ message: "User not found with the mentioned Id" });
      }
    }
  } catch (error) {
    throw error;
  }
});

module.exports = router;
