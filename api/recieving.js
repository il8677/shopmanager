const express = require("express")

const route = express.Router();

let Recieved = require("./models/recieving-model.js");

route.route("/create").post(function (req, res) {
    let recieved = new Recieved(req.body);
    recieved.save()
        .then(product => {
            res.status(200).json("Recieve added successfully");
        })
        .catch(err => {
            res.status(400).send("Failed\n" + err);
        });
});

module.exports = route;