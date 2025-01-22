const mongoose = require("mongoose");

async function Product(req, res) {
  try {
    console.log("trying");
    const fetchData = mongoose.connection.db.collection("Product");
   let data1;
    data1 = await fetchData.find({}).toArray();
    console.log('data got successfully');
    console.log('data1 is    ',data1);
    return res.status(200).json({
     Product: data1,
     success: true
    });
  } catch (error) {
    console.error("Error in Show_Orders:", error);
    return res.status(500).send("Internal Server Error");
  }
}

module.exports = Product;
