const mongoose = require('mongoose');


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
foodSchema.index({ foodName: 'text', userDisplayName: 'text', category: 'text' })

module.exports = Food = mongoose.model('foods', foodSchema);