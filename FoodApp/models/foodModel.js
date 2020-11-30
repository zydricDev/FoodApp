const mongoose = require('mongoose');
const { stringify } = require('querystring');

const foodSchema = new mongoose.Schema({
    foodName: {type: String, required: true},
    userDisplayName: {type: String, required: true},
    userId: {type: String, required: true},
    price: {type: String},
    desc: {type: String},
    image: {type: String},
    category: {type: String, required: true},
    feature: {type: Boolean},
    
});

module.exports = Food = mongoose.model('foods', foodSchema);