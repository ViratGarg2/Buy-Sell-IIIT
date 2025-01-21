const mongoose = require('mongoose');
const productSchema = require('../Schema/Product.js');

const Product = mongoose.model('Product', productSchema);

module.exports = Product;

