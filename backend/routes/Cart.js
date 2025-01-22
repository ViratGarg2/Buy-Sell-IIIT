const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const jwtSecret = 'IAmTheGreatestOfAllTimewwwwwwwww'; // Ensure this matches your secret

// Assuming you have User and Product models defined
const User = require('../models/User.js');
const Product = require('../models/Product.js');
const Order = require('../models/Order.js');
async function Cart(req, res) {
  try {
    // Extract the token from the 'auth-token' header
    const token = req.headers['auth-token'];
    if (!token) {
      return res.status(401).json({ success: false, message: 'No token provided' });
    }
    const decoded = jwt.verify(token, jwtSecret);
    const email = decoded.user.email;
    const user = await User.findOne({ email:email });
    if (!user) {
      return res.status(404).json({ success: false, message: 'Not Found' });
    }
    const productIds = user.cart.map(item => item.product_id);

    // console.log(productIds[0],typeof productIds[0]);


    return res.status(200).json({
      success: true,
    });
  } catch (error) {
    console.error('Error in fetching cart details:', error);
    return res.status(500).send('Internal Server Error');
  }
}

module.exports = Cart;
