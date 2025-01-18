const mongoose = require('mongoose');
const userSchema = require('../Schema/User.js');


const User = mongoose.model('User', userSchema);

module.exports = User;

