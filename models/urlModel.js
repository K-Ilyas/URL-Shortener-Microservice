const mongoose = require("mongoose");



const UrlSchema = new mongoose.Schema({
    url: { type: String, required: true, unique: true },
    urlShortener: { type: Number, required: true, unique: true }
});

module.exports = mongoose.model('UrlShortener', UrlSchema);


