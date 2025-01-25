const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const jwtSecret = "IAmTheGreatestOfAllTimewwwwwwwww";
const User = require('../models/User');
 
async function Remove(req, res) {
    const authToken = req.headers["auth-token"];
    let decoded;
    try{
    decoded = jwt.verify(authToken, jwtSecret);
    }catch(error){
        return res.status(401).json({ error: 'Invalid authentication token' });
    }
    const email = decoded.user.email;
    const id = req.params.id;
    // console.log('email is ',email,'item id is',id);
  try {
//     console.log("fetching detail...");
    const user = await User.findOne({email:email});
    const productExists = user.cart.some(item => item.product_id.toString() === id);
    if (productExists) {
        user.cart = user.cart.filter(item => item.product_id !== id);
        await user.save();
        return res.status(200).json({ success: true, message: "Product removed from cart" });
    }else{
    return res.status(500).json({success:false,message:"Not found in cart"}); 
  }
}catch(error){
    return res.status(500).json({success:false,message:"Server error occured"}); 
}
}

module.exports = Remove;
