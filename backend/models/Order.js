const mongoose = require('mongoose');
const orderSchema = '../Schema/Order.js';

const Order = mongoose.model('Order', orderSchema);
module.exports = Order;

