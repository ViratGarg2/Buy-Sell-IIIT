const express = require("express");
const jwt = require("jsonwebtoken");
const User = require("../models/User"); // Assuming you have a User model
const router = express.Router();
const bcrypt = require('bcryptjs');
const JWT_SECRET = process.env.JWT; // Replace with your actual JWT secret key

// Middleware to authenticate token and extract user email
const authenticateToken = (req, res, next) => {
  const token = req.header("auth-token");
  if (!token) {
    return res.status(401).json({ success: false, message: "Access denied. No token provided." });
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.userEmail = decoded.user.email; // Extract the email from the token
    next();
  } catch (error) {
    res.status(400).json({ success: false, message: "Invalid token." });
  }
};

// Route to update user profile
router.post("/", authenticateToken, async (req, res) => {
  const userEmail = req.userEmail; // Email extracted from the token
  const updatedFields = req.body; // Updated fields from the frontend

  try {
    // Find the user by email and update their details
    if(updatedFields.password){
      console.log(updatedFields.password);
      const salt = await bcrypt.genSalt(10);
      updatedFields.password = await bcrypt.hash(updatedFields.password,salt);
    }
    const user = await User.findOneAndUpdate({ email: userEmail }, updatedFields, { new: true });
    console.log(user);
    if (!user) {
      return res.status(404).json({ success: false, message: "User not found." });
    }

    res.status(200).json({ success: true, message: "Profile updated successfully.", user });
  } catch (error) {
    console.error("Error updating profile:", error);
    res.status(500).json({ success: false, message: "An error occurred while updating the profile." });
  }
});

module.exports = router;
