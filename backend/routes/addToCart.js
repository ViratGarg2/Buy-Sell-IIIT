const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const jwtSecret = "IAmTheGreatestOfAllTimewwwwwwwww";
const User = require('../models/User');
 
async function addToCart(req, res) {
    const authToken = req.headers["auth-token"];
    let decoded;
    try{
    decoded = jwt.verify(authToken, jwtSecret);
    }catch(error){
        return res.status(401).json({ error: 'Invalid authentication token' });
    }
    const email = decoded.user.email;
    const id = req.params.id;
  try {
    console.log("fetching detail...");
    const user = await User.findOne({email:email});
    const productExists = user.cart.some(item => item.product_id.toString() === id);
    if (productExists) {
      return res.status(400).json({ success:false,message: 'Product already in cart' });
    }else{
    if(user){
    user.cart.push({product_id:id});
    await user.save();
    }else{
        res.status(500).json({error:"User not found"});
    }

    return res.status(200).json({
     success: true
    });
}
  } catch (error) {
    console.error("Error in Show_Orders:", error);
    return res.status(500).json({error:`${error}`});
  }
}

module.exports = addToCart;
