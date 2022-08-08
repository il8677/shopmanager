const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let User = new Schema({
    username: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    
    product: {type: Boolean, default: false},
    recieving: {type: Boolean, default: false},
    sales: {type: Boolean, default: false},
    cash: {type: Boolean, default: false},
    purchasing: {type: Boolean, default: false},
    credit: {type: Boolean, default: false},
    customer: {type: Boolean, default: false},
    inventory: {type: Boolean, default: false},
    receipt: {type: Boolean, default: false},
    management: {type: Boolean, default: false},
})

module.exports = mongoose.model("User", User);