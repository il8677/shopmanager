const express = require("express")
const jwt = require("jsonwebtoken")
const bcrypt = require("bcrypt")

const route = express.Router();

let User = require("./models/user-model.js");
let Auth = require("./auth.js")

route.route("/register").post(async(req, res) => {
    const user = req.body;

    console.log(user);

    const usernameTaken = await User.findOne({username: user.username})

    if(usernameTaken){
        res.status(409).json({message: "Username has already been taken"})
        return;
    }

    user.password = await bcrypt.hash(req.body.password, 10);

    const insertUser = new User({
        username: user.username,
        password: user.password,
        accesses: user.accesses
    })

    insertUser.save(function(err) {
        if(err) {
            res.status(500).json({message: "Internal server error"})
            console.log(err)
        }
        else res.json({message: "success"})
    })
})

route.post("/delete/:id", (req, res) => {
    let id = req.params.id;

    User.findByIdAndDelete(id, function(err, user){
        if(!user) res.status(404).send("data not found");
        else res.json({message:"User deleted"});
    })
})

module.exports = route;
