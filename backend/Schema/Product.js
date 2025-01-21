const mongoose = require('mongoose');
const User = require('./User');
const Order = require('./Order');
const productSchema = new mongoose.Schema({
    name: { type: String, required: true },
    price: { type: Number, required: true },
    description: { type: String },
    category: { type: String, required: true },
    // seller_id: { type: mongoose.Schema.Types.ObjectId, ref: User, required: true },
    order_id:{type:String,required:true},
    created_at: { type: Date, default: Date.now },
});

module.exports = productSchema;