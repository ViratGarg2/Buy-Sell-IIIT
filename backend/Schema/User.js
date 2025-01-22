const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
    id: {type:String,unique:true,required:true},
    first_name: { type: String, required: true },
    last_name: { type: String, required: true },
    email: {
        type: String,
        required: true,
        unique: true,
        match: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.iiit\.ac\.in$/

    },
    age: { type: Number, required: true },
    contact_number: { type: String, required: true },
    password: { type: String, required: true },
    cart: [
        {
            product_id: { type: String, required: true },
            // quantity: { type: Number, required: true }
        }
    ],
    comment: [
        {
            name: { type: String},
            rating: { type: Number, required: true },
            comment: { type: String }
        },
    ],
    created_at: { type: Date, default: Date.now },
});

module.exports = userSchema;

