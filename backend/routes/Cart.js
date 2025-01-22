const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const jwtSecret = 'IAmTheGreatestOfAllTimewwwwwwwww'; // Ensure this matches your secret

// Assuming you have User and Product models defined
const User = require('../models/User.js');
const Product = require('../models/Product.js');

async function Cart(req, res) {
  try {
    // Extract the token from the 'auth-token' header
    const token = req.headers['auth-token'];
    if (!token) {
      return res.status(401).json({ success: false, message: 'No token provided' });
    }
    const decoded = jwt.verify(token, jwtSecret);
    const email = decoded.user.email;
    console.log(email);
    const user = await User.findOne({ email:email });
    if (!user) {
      return res.status(404).json({ success: false, message: 'Not Found' });
    }
    const productIds = user.cart.map(item => item.product_id);
    let data1;
    let data2 = [];
    for(const i of productIds){
    data1 = await mongoose.connection.db.collection("Product").find({id:i}).toArray();
    data2.push(data1);
    console.log(i);
    }
    // console.log(productIds[0],typeof productIds[0]);
    // const products = await Product.find({});
    console.log(data2);
    return res.status(200).json({
      data:data2,
      success: true,
    });
  } catch (error) {
    console.error('Error in fetching cart details:', error);
    return res.status(500).send('Internal Server Error');
  }
}

module.exports = Cart;
