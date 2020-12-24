const mongoose = require('mongoose');


const bundleSchema = new mongoose.Schema({
    items: {type: Array, required: true},
    total_price: {type: String},
    client_id: {type: String},
    client_geo_lat: {type: String},
    client_geo_lng: {type: String},
    owner: {type: String},
    distance: {type: String},
    quantity: {type: String},
    last_updated: {type: Date, default: new Date()}
})


 

module.exports = PurchasedBundle = mongoose.model('bundleditems', bundleSchema);