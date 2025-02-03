const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const crypto = require("crypto");
const mongoose = require("mongoose");
const jwtSecret = "IAmTheGreatestOfAllTimewwwwwwwww";

// Utility function to generate a random string
function generateRandomString(length) {
  return crypto.randomBytes(length).toString("hex").slice(0, length);
}

// Route to add an item to the Product collection
async function buy(req, res) {
  try {
    console.log("Processing request to add a product...");

    // Extract the auth-token from the headers
    const authToken = req.headers["auth-token"];
    if (!authToken) {
      return res.status(401).json({ success: false, message: "Unauthorized: Token missing" });
    }
    // console.log("Decoded email:", email);

    // Fetch the seller details from the "users" collection
    console.log(req.body);
    const seller = req.body;
    console.log(seller);
    if (!seller) {
      return res.status(404).json({ success: false, message: "Seller not found" });
    }

    const sellerId = seller.id; // Keep `id` as per your preference
    const productId = generateRandomString(16);

    // New product object
    const newProduct = {
      name: req.body.name,
      price: req.body.price,
      description: req.body.description,
      category: req.body.category,
      seller_id: sellerId,
      order_id: "some_order_id", // Placeholder for order ID
      id: productId,
      created_at: new Date(),
      img_link:req.body.img_link,
    };

    // Insert the product into the "Product" collection
    const db = mongoose.connection.db;
    const result = await db.collection("Product").insertOne(newProduct);

    // Respond with success
    if (result.insertedId) {
      console.log("Product added successfully:", newProduct);
      res.status(201).json({
        success: true,
        message: "Product added successfully",
        product: newProduct,
      });
    } else {
      console.error("Failed to add product to the database");
      res.status(500).json({
        success: false,
        message: "Failed to add product",
      });
    }
  } catch (error) {
    console.error("Error adding product:", error.message);
    res.status(500).json({ success: false, message: "Server error" });
  }
}

module.exports = buy;
