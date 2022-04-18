const mongoose = require('mongoose');
const { Schema } = mongoose;

const response = new Schema({
    original_url: {type: String, required: true},
    short_url: {type: Number, required: true}
});

module.exports = mongoose.model('url_response', response);