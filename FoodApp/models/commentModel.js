const mongoose = require('mongoose');
const { stringify } = require('querystring');

const commentSchema = new mongoose.Schema({
    userId: {type: String, required: true},
    recipientId: {type: String, required: true},
    userDisplayName: {type: String},
    icon: {type: String},
    rating: {type: String},
    comment: {type: String},
    date: {type: Date, default: Date.now}
})


module.exports = Comment = mongoose.model('comments', commentSchema);