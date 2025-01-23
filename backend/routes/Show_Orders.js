const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const { ObjectId } = require('mongodb');
const jwtSecret = "IAmTheGreatestOfAllTimewwwwwwwww";

async function Show_Orders(req, res) {
  try {
    console.log("trying");
    const authToken = req.headers["auth-token"];
    if (!authToken) {
      return res.status(401).send("Unauthorized: Missing auth token");
    }

    let userId;
    try {
      const decoded = jwt.verify(authToken, jwtSecret);
      console.log('decoded is',decoded.user,typeof decoded.user);

      global.userId = decoded.email;
      userId = decoded.user.email;
      console.log(userId);
    
    } catch (error) {
      return res.status(403).send("Invalid or expired token");
    }
    // console.log(typeof userId);
    // console.log("userId:", decoded.user ,typeof decoded.user);

    // const userObjectId1 = mongoose.Types.ObjectId.isValid(userId);
    // ? new mongoose.Types.ObjectId(userId)
    // : userId;

    // console.log('userId is of type',typeof userId);


    const fetchData = mongoose.connection.db.collection("Order");
    const user = await mongoose.connection.db.collection("users").findOne({ email: userId }); // Assume userId is the email
    if (!user || !user.id) {
      throw new Error("User not found or invalid ID");
    }
    const uniqueId = user.id.toString(); // Extract the unique MongoDB ObjectId
    // console.log('id is',uniqueId);
    // Step 2: Fetch data using the unique ID as seller_id or buyer_id
    const data1 = await fetchData.find({ status: "pending",buyer_id:uniqueId}).toArray();
    const data2 = await fetchData.find({ status: "delivered", seller_id: uniqueId }).toArray();
    const data3 = await fetchData.find({ status: "delivered", buyer_id: uniqueId }).toArray();
    // console.log(data1);
    console.log(data2);
    // console.log(data3);
    return res.status(200).json({
      pendingOrders: data1,
      deliveredAsSeller: data2,
      deliveredAsBuyer: data3,
    });
  } catch (error) {
    console.error("Error in Show_Orders:", error);
    return res.status(500).send("Internal Server Error");
  }
}

module.exports = Show_Orders;
