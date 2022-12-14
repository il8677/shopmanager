const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let Product = new Schema({
    name: {
        type: String,
        required: true
    },
    retail: {
        type: Number,
        required: true
    },
    cost: {
        type: Number,
        required: true
    },
    expiration: {
        type: Date,
        required: true
    },
});

module.exports = mongoose.model("Product", Product);