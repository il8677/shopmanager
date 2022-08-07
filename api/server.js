const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');

const PORT = 8080;

let Product = require("./models/product-model.js");

app.use(cors());
app.use(bodyParser.json());

mongoose.connect('mongodb://127.0.0.1:27017/todos', { useNewUrlParser: true });
const connection = mongoose.connection;

connection.once('open', function() {
    console.log("MongoDB database connection established successfully");
})

const productsRoute = express.Router();
productsRoute.route("/").get(function(req, res){
    Product.find(function(err, products) {
        if(err) {
            console.log(err);
        } else {
            res.json(products);
        }
    });
});

productsRoute.route("/:id").get(function (req, res){
    let id = req.params.id;
    Product.findById(id, function(err, product) {
        res.json(product);
    });
});

productsRoute.route("/create").post(function (req, res) {
    let product = new Product(req.body);
    product.save()
        .then(product => {
            res.status(200).json("Product added successfully");
        })
        .catch(err => {
            res.status(400).send("Failed\n" + err);
        });
});

productsRoute.route("/update/:id").post(function(req, res) {
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

app.use("/products", productsRoute);

app.listen(PORT, function() {
    console.log("Server is running on Port: " + PORT);
});