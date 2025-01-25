const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const jwtSecret = 'IAmTheGreatestOfAllTimewwwwwwwww'; // Ensure this matches your secret
// const bcrypt = require('bcrypt'); // For hashing OTPs
const crypto = require('crypto'); // For generating random IDs and OTPs
async function Buy(req, res) {
  try {
    // Extract the token from the 'auth-token' header
    const token = req.headers['auth-token'];
    if (!token) {
      return res.status(401).json({ success: false, message: 'No token provided' });
    }
    
    const decoded = jwt.verify(token, jwtSecret);
    const email = decoded.user.email;
    // console.log(email);

    const user = await mongoose.connection.db.collection('users').findOne({ email: email });
    // console.log(user);

    if (!user) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }
    const cartItems = user.cart;
    if (cartItems.length === 0) {
      return res.status(400).json({ success: false, message: 'Cart is empty' });
    }
    let amount = 0;
    for (const item of cartItems) {
        console.log('item is ',item);
      const product = await mongoose.connection.db.collection("Product").findOne({id:item.product_id});
      if (!product) {
        return res.status(404).json({ success: false, message: 'Product not found' });
      }
      amount += product.price;
    //   console.log(product);

      const orderId = crypto.randomUUID();
      const otp = Math.floor(100000 + Math.random() * 900000).toString(); // 6-digit OTP
      if(user.id === product.seller_id){
        return res.status(500).json({
          success:false,
          message:"Can't buy own items",
        })
      }
      const newOrder = {
        id: orderId,
        buyer_id: user.id, // Ensure it's stored as a string
        seller_id: product.seller_id,
        amount: product.price,
        hashed_otp: otp, // Use hashed OTP
        status: 'pending', // Consistent status formatting
        product_id: product.id, // Ensure it's stored as a string
        created_at: new Date(), // Add timestamp manually since it's not automatically handled here
      };
      
      // Insert into the 'Order' collection
      await mongoose.connection.db.collection('Order').insertOne(newOrder);
   
  }
  await mongoose.connection.db.collection('users').updateOne(
    { id: user.id }, // Find the user by their ID
    { $set: { cart: [] } } // Set the `cart` field to an empty array
  );
//   await user.save();

  return res.status(201).json({
    success: true,
    message: 'Orders created successfully',
    amount: amount,
  });
}catch (error) {
    console.error('Error in creating orders:', error);
    return res.status(500).send('Internal Server Error');
  }
}

module.exports = Buy;
