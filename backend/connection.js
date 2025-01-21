const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const jwtSecret = "IAmTheGreatestOfAllTimewwwwwwwww";


const connect = async (URL) => {
  try {
    await mongoose.connect(URL, {});
    console.log("Connected to MongoDB");
    // Access the collection and fetch data
    // if(localStorage.getItem("authToken")){
    // const fetchData = mongoose.connection.db.collection("Order");
    // const data1 = await fetchData.find({status:"pending"}).toArray();
    // const data2 = await fetchData.find({status:"delivered",seller_id:localStorage.getItem("id")}).toArray();
    // const data3 = await fetchData.find({status:"delivered",buyer_id:localStorage.getItem("id")}).toArray();
    // if(err)console.log(err);
    // else{
    //   global.data1 = data1;
    //   global.data2 = data2;
    //   global.data3 = data3;
    //   console.log("data1 is ",data1);
    //   console.log("data2 is ",data2);
    //   console.log("data3 is ",data3);
    // }
    
    console.log("Done");
    
  } catch (err) {
    console.log("unable to fetch data", err);
  }
};

module.exports = connect;
