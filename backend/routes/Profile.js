const express = require("express");
const router = express.Router();
const User = require("../models/User.js");

const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const jwtSecret = process.env.JWT;
router.get("/get", async (req, res) => {
  const authToken = req.header("auth-token");
  if (!authToken) {
    return res.status(401).json({ success: false, message: "No token provided" });
  }

  try {
    // Verify the token
    const decoded = jwt.verify(authToken, jwtSecret);

    // Extract user ID from the decoded token
    const userId = decoded.user.email;

    // Find user in the database
    const user = await User.find({email:userId}); // Exclude password field
    // console.log(pass);
    if (!user) {
      return res.status(404).json({ success: false, message: "User not found" });
    }

    // Send user details
    console.log("user is ",user);
    res.json({ success: true, user });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ success: false, message: "Invalid token" });
  }
});

module.exports = router;
