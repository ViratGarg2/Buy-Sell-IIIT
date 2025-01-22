const express = require("express");
const router = express.Router();
const User = require("../models/User.js");
const { body, validationResult } = require("express-validator");
const bcrypt = require("bcryptjs"); // Use bcrypt for password hashing
const jwt = require("jsonwebtoken");
const axios = require('axios');
const jwtSecret = "IAmTheGreatestOfAllTimewwwwwwwww";
const crypto = require('crypto');

function generateRandomString(length) {
  return crypto.randomBytes(length).toString('hex').slice(0, length);
}

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
      const id1 = generateRandomString(16);
      console.log(id1);
      await User.create({
        first_name: req.body.first_name,
        last_name: req.body.last_name,
        email: req.body.email,
        age: req.body.age,
        contact_number: req.body.contact_number,
        password: hashedPassword,
        cart: req.body.cart,
        seller_reviews: req.body.seller_reviews,
        id: id1,
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
    const captcha = req.body.value;
    const secretKey = '6LfvMcAqAAAAALVjNtBEoxzFqlpU6bgWh6_7LULY';
    const verificationURL = `https://www.google.com/recaptcha/api/siteverify?secret=${secretKey}&response=${captcha}`;
    try{
      const response = await axios.post(verificationURL);
    const { success } = response.data;
    if(success){
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
            email:user.email,
        }
      }
      console.log(user.email);
      const authToken = jwt.sign(data,jwtSecret);
      res.json({
        success: true,
        message: "Login successful",
        authToken: authToken,
        first_name: user.first_name,
        last_name: user.last_name,
        contact_number: user.contact_number,
        email: user.email,
        id: user.id,
      });
    } catch (err) {
      console.error(err);
      res.json({ success: false, error: "Server error"});
    }
  }else{
    res.status(400).json({ message: 'reCAPTCHA verification failed' });
  }
  }
  catch(error){
    res.status(500).json({ message: 'Error verifying reCAPTCHA' });
  }
}
);

module.exports = router;
