const mongoose = require('mongoose');
const { stringify } = require('querystring');

const categorySchema = new mongoose.Schema({
    newCategoryType: {type: String, required: true},
    img: {type: String, required: true}
});

module.exports = Category = mongoose.model('categories', categorySchema);