const mongoose = require('mongoose');
const productSchema = require('../Product/User.js');

const Product = mongoose.model('Product', productSchema);

module.exports = Product;

