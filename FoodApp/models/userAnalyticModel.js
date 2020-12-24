const mongoose = require('mongoose');


const userAnalyticSchema = new mongoose.Schema({
    item_id: {type: String, required: true},
    item_name: {type: String},
    item_price: {type: String},
    client_id: {type: String, required: true},
    client_geo_lat: {type: String},
    client_geo_lng: {type: String},
    seller_id: {type: String, required: true},
    seller_name: {type: String},
    quantity: {type: String},
    entry_date: {type: Date, default: new Date()}
})


 

module.exports = UserAnalytics = mongoose.model('purchaseditems', userAnalyticSchema);