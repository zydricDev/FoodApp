const mongoose = require('mongoose');

const listedBundleSchema = new mongoose.Schema({
    items: {type: Array, required: true},
    owner: {type: String},
    last_updated: {type: Date, default: new Date()}
})

module.exports = ListedBundle = mongoose.model('bundledfoodlistings', listedBundleSchema);

