const mongoose = require('mongoose');


const precheckoutSchema = new mongoose.Schema({
    itemId: {type: String, required: true},
    itemName: {type: String},
    itemPrice: {type: String},
    buyerName: {type: String},
    buyerId: {type: String, required: true},
    buyerAddress: {type: String},
    sellerName: {type: String},
    sellerId: {type: String, required: true},
    sellerAddress: {type: String},
    icon: {type: String},
    estDeliver: {type: String},
    distance: {type: String},
    quantity: {type: String},
    sellerCoor: {type: Array}, 
    buyerCoor: {type: Array},
    date: {type: Date, default: Date.now}
})


 

module.exports = Precheckout = mongoose.model('precheckouts', precheckoutSchema);