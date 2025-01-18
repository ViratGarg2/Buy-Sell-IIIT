const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
    transaction_id: { type: String, required: true },
    buyer_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    seller_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    amount: { type: Number, required: true },
    hashed_otp: { type: String, required: true },
    created_at: { type: Date, default: Date.now },
});

module.exports = orderSchema;