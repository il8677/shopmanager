const express = require("express")

const route = express.Router();

let Product = require("./models/product-model.js");

route.route("/").get(function(req, res){
    Product.find(function(err, products) {
        if(err) {
            console.log(err);
        } else {
            res.json(products);
        }
    });
});

route.route("/:id").get(function (req, res){
    let id = req.params.id;
    Product.findById(id, function(err, product) {
        res.json(product);
    });
});

route.route("/create").post(function (req, res) {
    let product = new Product(req.body);
    product.save()
        .then(product => {
            res.status(200).json("Product added successfully");
        })
        .catch(err => {
            res.status(400).send("Failed\n" + err);
        });
});

route.route("/update/:id").post(function(req, res) {
    let id = req.params.id;

    Product.findById(id, function(err, product) {
        if(!product) res.status(404).send("data not found");
        else {
            let body = req.body;
            product.retail = body.retail;
            product.cost = body.cost;
            product.expiration = body.expiration;

            product.save()
                .then(product => {
                    res.status(200).json("Product updated");
                })
                .catch(err => {
                    res.status(400).send("Failed\n" + err);
                });
        }
    });
});

module.exports = route;