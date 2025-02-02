const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const jwtSecret = "IAmTheGreatestOfAllTimewwwwwwwww";
// const Order = require("../models/Order.js");
const User = require("../models/User.js");
// const Product = require("../models/Product.js");

async function Left_Orders(req, res) {
  const authToken = req.headers["auth-token"];

  if (!authToken) {
    return res.status(401).json({ success: false, message: "No token provided" });
  }

  let decodedId;
  try {
    console.log("Working corretly");
    const decoded = jwt.verify(authToken, jwtSecret);
    decodedId = decoded.user.email; // Assuming the token has a user object with an id
    
  } catch (error) {
    return res.status(403).json({ success: false, message: "Invalid or expired token" });
  }

  let user = await User.findOne({ email: decodedId });
  // console.log('email is ',user.seller_id);
  try {
    const data = await mongoose.connection.db
      .collection("Order") // Use lowercase collection name as MongoDB defaults to lowercase
      .aggregate([
        {
          $lookup: {
            from: "Product", 
            localField: "product_id",
            foreignField: "id",
            as: "productDetails",
          },
        },
        { $unwind: "$productDetails" },
        {
              $lookup: {
                from: "users", // Reference the "users" collection
                localField: "buyer_id",
                foreignField: "id", // Ensure correct foreignField for the lookup
                as: "userDetails",
              },
            },
            { $unwind: { path: "$userDetails", preserveNullAndEmptyArrays: true } },
        {
              $match: {
              status: "pending",
              seller_id: user.id,
              },
            },
        {
          $project: {
            itemName: "$productDetails.name", // Extract product name
            buyerName: "$userDetails.first_name", // Extract buyer's name
            orderValue: "$amount", // Extract order value
            id: "$id",
          },
        },
      ])
      .toArray();
      console.log(data);
    res.status(200).json({ success: true, data });
  } catch (error) {
    console.error("Error fetching pending orders:", error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
}

module.exports = Left_Orders;
