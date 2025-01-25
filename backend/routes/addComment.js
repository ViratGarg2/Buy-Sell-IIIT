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
    console.log(email);
    const id = req.params.id;
  try {
    // console.log("fetching detail...");
    const seller = await mongoose.connection.db.collection("Product").findOne({id:id});
    const {comment} = req.body;
    const name = await User.findOne({email:email})
    // console.log('name is ',seller.seller_id);
    // console.log('comment is ',comment);
    if (!comment.rating || !comment || comment.rating < 0 || comment.rating > 5) {
        return res.status(400).json({ success: false, message: "Invalid input for rating or comment" });
    }
    console.log('rating',comment.rating);
    const newComment = {
        name: name.first_name, // If no name is provided, use "Anonymous"
        rating : comment.rating,
        comment : comment.comment,
      };
  
      // Find the user by ID and push the comment into the `comment` array
      const updatedUser = await User.findOneAndUpdate(
        { id: seller.seller_id }, // Find the user by `id`
        { $push: { comment: newComment } }, // Push the new comment to the `comment` array
        { new: true } // Return the updated user document
      );
    //   console.log('user is',updatedUser);
      // If user is not found
      if (!updatedUser) {
        return res.status(404).json({ success: false, message: "User not found" });
      }
  
      res.status(200).json({
        success: true,
        message: "Comment added successfully",
        user: updatedUser,
      });
}
 catch (error) {
    console.error("Error in Show_Orders:", error);
    return res.status(500).json({error:`${error}`});
  }
}

module.exports = addToCart;
