const express = require("express");
const router = express.Router();
const User = require("../models/User.js");
const { body, validationResult } = require("express-validator");
const bcrypt = require("bcryptjs"); // Use bcrypt for password hashing
const jwt = require("jsonwebtoken");
// Registration Endpoint

const jwtSecret = "IAmTheGreatestOfAllTimewwwwwwwww";

router.post(
  "/createUser",
  [
    body("password", "Password should be at least 8 characters").isLength({
      min: 8,
    }),
    body("email", "Enter a valid email").isEmail(),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      // Hash the password before saving
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(req.body.password, salt);

      await User.create({
        first_name: req.body.first_name,
        last_name: req.body.last_name,
        email: req.body.email,
        age: req.body.age,
        contact_number: req.body.contact_number,
        password: hashedPassword,
        cart: req.body.cart,
        seller_reviews: req.body.seller_reviews,
      });

      res.json({ success: true, message: "User created successfully" });
    } catch (err) {
      console.error(err);
      res.status(500).json({ success: false, message: "Server error" });
    }
  }
);

// Login Endpoint
router.post(
  "/login_check",
  [
    body("email", "Enter a valid email").isEmail(),
    body("password", "Password cannot be empty").notEmpty(),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    let email1 = req.body.email;
    console.log(email1);
    console.log("Invalid password");
    try {
      let user = await User.findOne({ email: email1 });
      console.log(user);
      if (!user) {
        return res.json({ success: false, error: "Email not registered" });
      }

      // Compare the hashed password
      const isMatch = await bcrypt.compare(req.body.password, user.password);
      if (!isMatch) {
        return res.json({ success: false, error: "Invalid password" });
      }
      const data = {
        user:{
            id:user.id
        }
      }
      const authToken = jwt.sign(data,jwtSecret);
      res.json({
        success: true,
        message: "Login successful",
        authToken: authToken,
        first_name: user.first_name,
        last_name: user.last_name,
        contact_number: user.contact_number,
        email: user.email
      });
    } catch (err) {
      console.error(err);
      res.json({ success: false, error: "Server error"});
    }
  }
);

module.exports = router;
