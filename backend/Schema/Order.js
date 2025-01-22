const mongoose = require('mongoose');
const User = require('./User');


const orderSchema = new mongoose.Schema({
    // transaction_id: { type: String, required: true },
    id:{type:String,unique:true,required:true},
    buyer_id: { type: String,required: true},
    seller_id: { type: String, required: true },
    amount: { type: Number, required: true },
    hashed_otp: { type: String, required: true },
    created_at: { type: Date, default: Date.now },
    status:{type:String,required:true},
    product_id:{type:String,required:true},
});

module.exports = orderSchema;