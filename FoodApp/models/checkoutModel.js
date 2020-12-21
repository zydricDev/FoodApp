const mongoose = require('mongoose');


const checkoutSchema = new mongoose.Schema({
    items: {type: Array, required: true},
    totalPrice: {type: String},
    userId: {type: String},
    userGeoLocation: {type: Array},
    sellerGeoLocationSet: {type: Array},
    purchasedDate: {type: Date, default: Date.now}
})


 

module.exports = Checkout = mongoose.model('checkouts', checkoutSchema);