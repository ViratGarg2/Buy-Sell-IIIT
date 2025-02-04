const mongoose = require("mongoose");
 
async function Product1(req, res,id) {
  try {
    console.log("fetching detail...");
    const fetchData = mongoose.connection.db.collection("Product");
    const token = req.headers['auth-token'];
    if (!token) {
      return res.status(401).json({ success: false});
    }
    // // const id1 = id.toString();
    // // console.log(id1);
    // // console.log(fetchData.find({seller_id:"678bdb5c622ef703e8f09c31"}));
    // console.log('Data is ',fetchData.find({}));
    const result = await fetchData.aggregate([
        {
            $match: { id: id }  // Match the specific product by its ObjectId
        },
        {
            $lookup: {
                from: "users",  // The collection to join
                localField: "seller_id",  // Field from the Product collection
                foreignField: "id",  // Field from the User collection
                as: "sellerDetails"  // Output array field
            }
        },
        {
            $unwind: "$sellerDetails"  // Deconstruct the array to get individual documents
        },
        {
            $project: {
                // _id: 1,
                name: "$name",
                description: "$description",
                price: "$price",
                category: "$category",
                id:"$id",
                seller_first_name: "$sellerDetails.first_name",
                seller_last_name: "$sellerDetails.last_name",
                seller_email: "$sellerDetails.email",
                seller_reviews: "$sellerDetails.comment",
                img_link: "$img_link",
            }
        }
    ]).toArray();

//   console.log(result);
    return res.status(200).json({
     Product: result[0],
     success: true
    });
  } catch (error) {
    console.error("Error in Show_Orders:", error);
    return res.status(500).send("Internal Server Error");
  }
}

module.exports = Product1;
