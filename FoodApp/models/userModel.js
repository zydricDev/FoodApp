const mongoose = require('mongoose');
const { stringify } = require('querystring');

const userSchema = new mongoose.Schema({
    email: {type: String, required: true, unique: true},
    password: {type: String, required: true, minlength: 5},
    icon: {type: String},
    displayName: {type: String},
    address: {type: String},
    zipcode: {type: String},
    phone: {type: String},
    country: {type: String},
});

module.exports = User = mongoose.model('users', userSchema);