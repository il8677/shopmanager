const express = require("express")

const route = express.Router();

let Recieved = require("./models/recieving-model.js");

route.route("/create").post(function (req, res) {
    let recieved = new Recieved(req.body);
    recieved.save()
        .then(product => {
            res.status(200).json({message: "Success"});
        })
        .catch(err => {
            res.status(400).send({message: "Failed\n" + err});
        });
});

module.exports = route;