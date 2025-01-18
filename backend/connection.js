const mongoose = require("mongoose");

const connect = async (URL) => {
  try {
    await mongoose.connect(URL, {});
    console.log("Connected to MongoDB");
    // Access the collection and fetch data
    const fetchData = mongoose.connection.db.collection("Test");
    const data = await fetchData.find({}).toArray();
    // console.log(data);
    console.log("Done");
  } catch (err) {
    console.log("unable to connect", err);
  }
};

module.exports = connect;
