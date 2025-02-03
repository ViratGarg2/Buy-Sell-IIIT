const express = require("express");
const router = express.Router();
const User = require("../models/User.js");
const { body, validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const axios = require("axios");
const crypto = require("crypto");
const session = require("express-session");
const passport = require("passport");
const CASStrategy = require("passport-cas").Strategy;

const jwtSecret = "IAmTheGreatestOfAllTimewwwwwwwww";
const CAS_SERVER_URL = "https://login.iiit.ac.in/cas/login"; // Replace with actual CAS server URL

function generateRandomString(length) {
  return crypto.randomBytes(length).toString("hex").slice(0, length);
}

// Session Middleware
router.use(
  session({
    secret: "your_secret_key",
    resave: false,
    saveUninitialized: true,
  })
);

// Initialize Passport
router.use(passport.initialize());
router.use(passport.session());

// Configure Passport CAS Strategy
passport.use(
  new CASStrategy(
    {
      casBaseURL: CAS_SERVER_URL,
    },
    async (username, profile, done) => {
      try {
        let user = await User.findOne({ email: username });

        if (!user) {
          user = await User.create({
            email: username,
            first_name: "CAS User",
            last_name: "",
            password: "", // CAS users don’t need a local password
            id: generateRandomString(16),
          });
        }

        return done(null, user);
      } catch (err) {
        return done(err);
      }
    }
  )
);

// Serialize and Deserialize User
passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  try {
    const user = await User.findById(id);
    done(null, user);
  } catch (err) {
    done(err);
  }
});

// Create User Endpoint
router.post(
  "/createUser",
  [
    body("password", "Password should be at least 8 characters").isLength({
      min: 8,
    }),
    body("contact_number", "Enter a valid phone number").isLength({ min: 10, max: 10 }),
    body("email", "Enter a valid email").isEmail(),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
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
    const secretKey = "6LfvMcAqAAAAALVjNtBEoxzFqlpU6bgWh6_7LULY";
    const verificationURL = `https://www.google.com/recaptcha/api/siteverify?secret=${secretKey}&response=${captcha}`;

    try {
      const response = await axios.post(verificationURL);
      const { success } = response.data;

      if (success) {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
          return res.status(400).json({ errors: errors.array() });
        }

        let email1 = req.body.email;
        console.log(email1);

        try {
          let user = await User.findOne({ email: email1 });
          console.log(user);

          if (!user) {
            return res.json({ success: false, error: "Email not registered" });
          }

          const isMatch = await bcrypt.compare(req.body.password, user.password);
          if (!isMatch) {
            return res.json({ success: false, error: "Invalid password" });
          }

          const data = { user: { email: user.email } };
          console.log(user.email);
          const authToken = jwt.sign(data, jwtSecret);

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
          res.json({ success: false, error: "Server error" });
        }
      } else {
        res.status(400).json({ message: "reCAPTCHA verification failed" });
      }
    } catch (error) {
      res.status(500).json({ message: "Error verifying reCAPTCHA" });
    }
  }
);

// CAS Login Route
router.get("/cas_login", passport.authenticate("cas"), (req, res) => {
  res.redirect("/"); // Redirect to dashboard after successful login
});

// CAS Logout Route
router.get("/cas_logout", (req, res) => {
  req.logout(() => {
    res.redirect(CAS_SERVER_URL + "/logout");
  });
});

module.exports = router;
