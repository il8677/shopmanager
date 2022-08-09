const express = require("express")

const route = express.Router();

let Product = require("./models/product-model.js");

route.route("/enum").get(function(req, res){
    const query = Product.find();
    query.select("name")

    query.exec(function(err, products) {
        if(err) {
            console.log(err);
        } else {
            console.log(products);
            res.json(products);
        }
    });
});

module.exports = route;
