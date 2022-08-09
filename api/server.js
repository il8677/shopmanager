const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');

const PORT = 25565;

const auth = require("./auth.js")

var config = require("./config")

app.use(cors());
app.use(bodyParser.json());

mongoose.connect(config.DB_URL, { useNewUrlParser: true });
const connection = mongoose.connection;

connection.once('open', function() {
    console.log("MongoDB database connection established successfully");
})

let productsAuthRoute = require("./products-auth.js")
let productsRoute = require("./products.js")
let userRoute = require("./users.js")
let recievingRoute = require("./recieving.js")
let managementRoute = require("./management.js")

app.use("/products", [new auth.AuthRequirement("product").verifyJWT, productsAuthRoute]);
app.use("/productsData", productsRoute);

app.use("/recieving", [new auth.AuthRequirement("recieving").verifyJWT, recievingRoute]);

app.use("/users", userRoute);
app.use("/management", [new auth.AuthRequirement("management").verifyJWT, managementRoute]);

app.listen(PORT, function() {
    console.log("Server is running on Port: " + PORT);
});