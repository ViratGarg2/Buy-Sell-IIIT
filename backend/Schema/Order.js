const mongoose = require('mongoose');
const User = require('./User');
const Product = require('./Product');


const orderSchema = new mongoose.Schema({
    // transaction_id: { type: String, required: true },
    buyer_id: { type: mongoose.Schema.Types.ObjectId,ref:"users",required: true },
    seller_id: { type: mongoose.Schema.Types.ObjectId,ref:"users", required: true },
    amount: { type: Number, required: true },
    hashed_otp: { type: String, required: true },
    created_at: { type: Date, default: Date.now },
    status:{type:String,required:true},
    product_id:{type:mongoose.Schema.Types.ObjectId,ref:"Product",required:true},
});

module.exports = orderSchema;