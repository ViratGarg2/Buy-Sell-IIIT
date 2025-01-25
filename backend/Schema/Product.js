const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    name: { type: String, required: true },
    price: { type: Number, required: true },
    description: { type: String },
    category: { type: String, required: true },
    seller_id: { type: String, required: true },
    order_id:{type:String,required:false},
    created_at: { type: Date, default: Date.now },
    img_link : {type:String},
    id:{type:String,required:true,unique:true},
});

module.exports = productSchema;