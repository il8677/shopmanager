const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let Recieve = new Schema({
    product: {type: Schema.Types.ObjectId, ref: "Product", required: true},
    qty: {type: Number}
});

module.exports = mongoose.model("Recieve", Recieve);