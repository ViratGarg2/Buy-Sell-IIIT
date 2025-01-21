const mongoose = require("mongoose");
// const express = require("express");
// const jwt = require("jsonwebtoken");
const User = require("../models/User.js");
const Product = require("../models/Product.js");
const Order = require("../models/Order.js");

const Item = async (req, res) => {
  
  try {
    const user = await Order.find();
    // const products = await Product.find({});
    console.log(user);
    return res.status(200).json({ Product: products, success: true });
  } catch (error) {
    console.error("Error fetching products:", error);
    return res.status(500).send("Internal Server Error");
  }
};

// router.post("/cart/:id", async (req, res) => {
//   const authToken = req.headers["auth-token"];
//   const productId = req.body.id;
//   console.log('productId is ',productId);
//   console.log('authToken is ',authToken);
//   // console.log('productId is ',productId);
//   if (!authToken) {
//     return res.status(401).json({ success: false, message: "Unauthorized" });
//   }

//   try {
//     // Decode the JWT to get the user's email
//     const decoded = jwt.verify(authToken,secretKey);
//     if (!decoded || !decoded.user || !decoded.user.email) {
//       return res.status(400).json({ success: false, message: "Invalid token" });
//     }
//     const userEmail = decoded.user.email;

//     // Find the user in the database
//     const user = await User.findOne({ email: userEmail });
//     if (!user) {
//       return res.status(404).json({ success: false, message: "User not found" });
//     }

//     // Check if the product already exists in the user's cart
//     if (user.cart.includes(productId)) {
//       return res.status(400).json({ success: false, message: "Item already in cart" });
//     }

//     // Add the product ID to the user's cart

//     return res.status(200).json({ success: true, message: "Item added to cart successfully" });
//   } catch (error) {
//     console.error("Error adding to cart:", error);
//     return res.status(500).send("Internal Server Error");
//   }
// });


module.exports = {Item};
