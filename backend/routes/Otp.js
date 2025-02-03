// const Order = require('../models/Order'); // Assuming you have an Order model
const mongoose = require('mongoose');

const checkOTP = async (req, res) => {
  try {
    const id = req.params.id;
    // console.log('id is',id);
    const otp = req.body.otp;
    // console.log('finally the otp is',otp);

    const order = await mongoose.connection.db.collection("Order").find({id:id}).toArray();

    if (!order) {
      return res.status(404).json({ success: false, message: 'Order not found' });
    }
    // console.log('order is ',order[0]);
    console.log(otp,order[0].hashed_otp);
    console.log("otp is",otp);
    if (order[0].hashed_otp === otp.toString()) {
      try {
        const result = await mongoose.connection.db.collection("Order").updateOne(
          { id },
          { $set: { status: "delivered" } }
        );
    
        if (result.modifiedCount > 0) {
          return res.status(200).json({
            success: true,
            message: "Order delivered successfully",
          });
        } else {
          return res.status(500).json({
            success: false,
            message: "Failed to update order status",
          });
        }
      } catch (error) {
        console.error("Error updating order:", error);
        return res.status(500).json({
          success: false,
          message: "Error updating order status",
        });
      }} else {
      return res.status(400).json({ 
        success: false, 
        message: 'Invalid OTP' 
      });
    }
  } catch (error) {
    console.error('OTP Verification Error:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Server error during OTP verification' 
    });
  }
};

module.exports = checkOTP;